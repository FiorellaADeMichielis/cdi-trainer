import { useState, useEffect, useCallback, useMemo } from 'react';
import { Exercise, ExerciseAttempt, MistakeRecord } from '../types/domain';
import { soundService } from '../services/soundService';

interface UseStudySessionProps {
  exercises: Exercise[];
  onRecordAttempt: (attempt: ExerciseAttempt, mistake?: MistakeRecord) => void;
  onFinishSession: () => void;
}

export const useStudySession = ({
  exercises,
  onRecordAttempt,
  onFinishSession
}: UseStudySessionProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState<number>(0);
  const [showProfessorModal, setShowProfessorModal] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const currentExercise = useMemo(() => {
    return exercises[currentIndex] || exercises[0];
  }, [exercises, currentIndex]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectOption = useCallback((optionId: string) => {
    if (isAnswered) return;
    soundService.playClick();
    setSelectedOptionId(optionId);
  }, [isAnswered]);

  const handleRevealNextHint = useCallback(() => {
    if (!currentExercise || revealedHintsCount >= currentExercise.hints.length) return;
    soundService.playClick();
    setRevealedHintsCount(prev => prev + 1);
  }, [currentExercise, revealedHintsCount]);

  const handleSubmitAnswer = useCallback(() => {
    if (!selectedOptionId || isAnswered || !currentExercise) return;

    const selectedOption = currentExercise.options.find(o => o.id === selectedOptionId);
    const isCorrect = selectedOption?.isCorrect ?? false;
    setIsAnswered(true);

    const attempt: ExerciseAttempt = {
      id: `attempt_${Date.now()}`,
      exerciseId: currentExercise.id,
      unitId: currentExercise.unitId,
      topicId: currentExercise.topicId,
      timestamp: Date.now(),
      timeSpentSeconds,
      hintsUsedCount: revealedHintsCount,
      isCorrect,
      isForgot: false,
      selectedOptionId
    };

    let mistakeRecord: MistakeRecord | undefined;
    if (isCorrect) {
      soundService.playCorrect();
      setCorrectCount(prev => prev + 1);
      const points = Math.max(10, 25 - revealedHintsCount * 3);
      setSessionScore(prev => prev + points);
    } else {
      soundService.playIncorrect();
      const unitKey = currentExercise.unitId.toLowerCase();
      mistakeRecord = {
        unitId: currentExercise.unitId,
        topicId: currentExercise.topicId,
        mistakeKey: `${unitKey}_algebra_sign`,
        description: currentExercise.explanation?.whereIsMistake || 'Error en procedimiento analítico',
        frequency: 1,
        lastOccurredAt: Date.now(),
        exampleExerciseId: currentExercise.id
      };
    }

    onRecordAttempt(attempt, mistakeRecord);
  }, [selectedOptionId, isAnswered, currentExercise, timeSpentSeconds, revealedHintsCount, onRecordAttempt]);

  const handleDontRemember = useCallback(() => {
    if (isAnswered || !currentExercise) return;
    soundService.playIncorrect();
    setIsAnswered(true);

    const attempt: ExerciseAttempt = {
      id: `attempt_${Date.now()}`,
      exerciseId: currentExercise.id,
      unitId: currentExercise.unitId,
      topicId: currentExercise.topicId,
      timestamp: Date.now(),
      timeSpentSeconds,
      hintsUsedCount: currentExercise.hints.length,
      isCorrect: false,
      isForgot: true,
      selectedOptionId: 'dont_remember'
    };

    const mistakeRecord: MistakeRecord = {
      unitId: currentExercise.unitId,
      topicId: currentExercise.topicId,
      mistakeKey: `${currentExercise.unitId.toLowerCase()}_formula_recall`,
      description: 'Dificultad para recordar la fórmula o definición correspondiente',
      frequency: 1,
      lastOccurredAt: Date.now(),
      exampleExerciseId: currentExercise.id
    };

    onRecordAttempt(attempt, mistakeRecord);
    setShowProfessorModal(true);
  }, [isAnswered, currentExercise, timeSpentSeconds, onRecordAttempt]);

  const handleNextExercise = useCallback(() => {
    soundService.playClick();
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
      setRevealedHintsCount(0);
      setShowProfessorModal(false);
    } else {
      setShowSummaryModal(true);
    }
  }, [currentIndex, exercises.length]);

  const handleCloseSession = useCallback(() => {
    soundService.playClick();
    onFinishSession();
  }, [onFinishSession]);

  return {
    currentIndex,
    currentExercise,
    totalExercises: exercises.length,
    selectedOptionId,
    isAnswered,
    revealedHintsCount,
    showProfessorModal,
    showSummaryModal,
    timeSpentSeconds,
    sessionScore,
    correctCount,
    setShowProfessorModal,
    setShowSummaryModal,
    handleSelectOption,
    handleRevealNextHint,
    handleSubmitAnswer,
    handleDontRemember,
    handleNextExercise,
    handleCloseSession
  };
};
