import { useState, useEffect, useCallback, useMemo } from 'react';
import { Exercise, ExamSimulationResult, UnitId } from '../types/domain';
import { EXERCISES_DATA } from '../data/exercisesData';
import { soundService } from '../services/soundService';

interface UseExamSimulatorProps {
  onRecordExamResult: (result: ExamSimulationResult) => void;
  onFinishExam: () => void;
}

const EXAM_DURATION_SECONDS = 90 * 60; // 90 minutes official UNNE exam

export const useExamSimulator = ({
  onRecordExamResult,
  onFinishExam
}: UseExamSimulatorProps) => {
  // Select balanced 10 exercises covering official curriculum
  const [examQuestions] = useState<Exercise[]>(() => {
    const units: UnitId[] = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10'];
    const chosen: Exercise[] = [];
    units.forEach(u => {
      const uExs = EXERCISES_DATA.filter(e => e.unitId === u);
      if (uExs.length > 0) {
        chosen.push(uExs[Math.floor(Math.random() * uExs.length)]);
      }
    });
    return chosen.length >= 5 ? chosen : EXERCISES_DATA.slice(0, 10);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState<number>(EXAM_DURATION_SECONDS);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examResult, setExamResult] = useState<ExamSimulationResult | null>(null);

  // Timer countdown
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
  }, []);

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

    let correctCount = 0;
    const weaknesses: string[] = [];

    examQuestions.forEach(q => {
      const chosen = answers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (chosen && correctOpt && chosen === correctOpt.id) {
        correctCount += 1;
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
      strengths: correctCount > 0 ? ['Demostró resolución analítica certera en ejercicios base'] : [],
      weaknesses,
      riskLevel,
      advice: totalScore >= 60 ? 'Condición de aprobación alcanzada en mesa de examen.' : 'Intensificar ejercicios prácticos en las unidades señaladas.',
      resultsByUnit: {} as Record<UnitId, { total: number; correct: number }>
    };

    setExamResult(result);
    onRecordExamResult(result);
  }, [examSubmitted, examQuestions, answers, timeLeft, onRecordExamResult]);

  const handleFinish = useCallback(() => {
    soundService.playClick();
    onFinishExam();
  }, [onFinishExam]);

  const answeredCount = useMemo(() => {
    return Object.keys(answers).length;
  }, [answers]);

  return {
    examQuestions,
    currentIndex,
    currentQuestion: examQuestions[currentIndex],
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
    handleFinish
  };
};
