import { useState, useEffect, useCallback, useMemo } from 'react';
import { ExamSimulationResult, UnitId } from '../types/domain';
import { EXERCISES_DATA } from '../data/exercisesData';
import { soundService } from '../services/soundService';
import { generateExamSession, ExamSession } from '../services/randomEngine';
import { StorageService } from '../services/storageService';

interface UseExamSimulatorProps {
  onRecordExamResult: (result: ExamSimulationResult) => void;
  onFinishExam: () => void;
}

const EXAM_DURATION_SECONDS = 90 * 60; // 90 minutes official UNNE exam

export const useExamSimulator = ({
  onRecordExamResult,
  onFinishExam
}: UseExamSimulatorProps) => {
  // 1. Initialize from existing active exam or generate new randomized session
  const [examSession, setExamSession] = useState<ExamSession>(() => {
    const saved = StorageService.loadActiveExam();
    if (saved && saved.session && saved.session.questions.length > 0) {
      return saved.session;
    }
    return generateExamSession({ pool: EXERCISES_DATA });
  });

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const saved = StorageService.loadActiveExam();
    return saved ? saved.currentIndex : 0;
  });

  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const saved = StorageService.loadActiveExam();
    return saved ? saved.answers : {};
  });

  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const saved = StorageService.loadActiveExam();
    return saved ? saved.timeLeft : EXAM_DURATION_SECONDS;
  });

  const [examStarted, setExamStarted] = useState<boolean>(() => {
    const saved = StorageService.loadActiveExam();
    return saved ? saved.examStarted : false;
  });

  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSimulationResult | null>(null);

  const examQuestions = examSession.questions;

  // 2. Persist active exam state so refreshes or tab switches don't lose the student's progress
  useEffect(() => {
    if (examStarted && !examSubmitted) {
      StorageService.saveActiveExam({
        session: examSession,
        answers,
        timeLeft,
        currentIndex,
        examStarted: true
      });
    }
  }, [examSession, answers, timeLeft, currentIndex, examStarted, examSubmitted]);

  // 3. Timer countdown
  useEffect(() => {
    if (!examStarted || examSubmitted) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [examStarted, examSubmitted]);

  const handleStartExam = useCallback(() => {
    soundService.playClick();
    setExamStarted(true);
    StorageService.saveActiveExam({
      session: examSession,
      answers,
      timeLeft,
      currentIndex,
      examStarted: true
    });
  }, [examSession, answers, timeLeft, currentIndex]);

  const handleSelectAnswer = useCallback((exerciseId: string, optionId: string) => {
    if (examSubmitted) return;
    soundService.playClick();
    setAnswers(prev => ({
      ...prev,
      [exerciseId]: optionId
    }));
  }, [examSubmitted]);

  const handleSubmitExam = useCallback(() => {
    if (examSubmitted) return;
    soundService.playCorrect();
    setExamSubmitted(true);
    StorageService.clearActiveExam();

    let correctCount = 0;
    const weaknesses: string[] = [];
    const resultsByUnit: Record<UnitId, { total: number; correct: number }> = {
      U1: { total: 0, correct: 0 },
      U2: { total: 0, correct: 0 },
      U3: { total: 0, correct: 0 },
      U4: { total: 0, correct: 0 },
      U5: { total: 0, correct: 0 },
      U6: { total: 0, correct: 0 },
      U7: { total: 0, correct: 0 },
      U8: { total: 0, correct: 0 },
      U9: { total: 0, correct: 0 },
      U10: { total: 0, correct: 0 }
    };

    examQuestions.forEach(q => {
      resultsByUnit[q.unitId].total += 1;
      const chosen = answers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (chosen && correctOpt && chosen === correctOpt.id) {
        correctCount += 1;
        resultsByUnit[q.unitId].correct += 1;
      } else {
        weaknesses.push(`${q.unitId}: ${q.subtopicTitle}`);
      }
    });

    const totalScore = Math.round((correctCount / examQuestions.length) * 100);
    const riskLevel = totalScore >= 80 ? 'BAJO' : totalScore >= 60 ? 'MEDIO' : totalScore >= 40 ? 'ALTO' : 'CRITICO';

    const result: ExamSimulationResult = {
      id: `exam_${Date.now()}`,
      timestamp: Date.now(),
      totalScore,
      durationSeconds: EXAM_DURATION_SECONDS - timeLeft,
      strengths: correctCount > 0 ? ['Demostró resolución analítica certera en ejercicios del examen'] : [],
      weaknesses,
      riskLevel,
      advice: totalScore >= 60 
        ? 'Condición de aprobación alcanzada en mesa de examen. Continuá afianzando velocidad.' 
        : 'Te recomendamos intensificar ejercicios prácticos en las unidades señaladas.',
      resultsByUnit
    };

    setExamResult(result);
    onRecordExamResult(result);
  }, [examSubmitted, examQuestions, answers, timeLeft, onRecordExamResult]);

  /**
   * Starts a brand new randomized exam attempt:
   * Generates a fresh session avoiding previous questions when possible,
   * resets answers, timer and state.
   */
  const handleRestartExam = useCallback(() => {
    soundService.playClick();
    StorageService.clearActiveExam();

    const previousIds = examQuestions.map(q => q.id);
    const newSession = generateExamSession({
      pool: EXERCISES_DATA,
      excludeIds: previousIds
    });

    setExamSession(newSession);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(EXAM_DURATION_SECONDS);
    setExamStarted(false);
    setExamSubmitted(false);
    setExamResult(null);
  }, [examQuestions]);

  const handleFinish = useCallback(() => {
    soundService.playClick();
    StorageService.clearActiveExam();
    onFinishExam();
  }, [onFinishExam]);

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  return {
    examQuestions,
    currentIndex,
    currentQuestion: examQuestions[currentIndex] || examQuestions[0],
    totalQuestions: examQuestions.length,
    answers,
    answeredCount,
    timeLeft,
    examStarted,
    examSubmitted,
    examResult,
    setCurrentIndex,
    handleStartExam,
    handleSelectAnswer,
    handleSubmitExam,
    handleRestartExam,
    handleFinish
  };
};
