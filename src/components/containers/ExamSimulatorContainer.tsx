import React from 'react';
import { ExamSimulationResult } from '../../types/domain';
import { useExamSimulator } from '../../hooks/useExamSimulator';
import { ExamSimulatorPresenter } from '../presentational/simulation/ExamSimulatorPresenter';

interface ExamSimulatorContainerProps {
  onRecordExamResult: (result: ExamSimulationResult) => void;
  onFinishExam: () => void;
}

export const ExamSimulatorContainer: React.FC<ExamSimulatorContainerProps> = ({
  onRecordExamResult,
  onFinishExam
}) => {
  const {
    examQuestions,
    currentIndex,
    currentQuestion,
    totalQuestions,
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
  } = useExamSimulator({
    onRecordExamResult,
    onFinishExam
  });

  return (
    <ExamSimulatorPresenter
      examQuestions={examQuestions}
      currentIndex={currentIndex}
      currentQuestion={currentQuestion}
      totalQuestions={totalQuestions}
      answers={answers}
      answeredCount={answeredCount}
      timeLeft={timeLeft}
      examStarted={examStarted}
      examSubmitted={examSubmitted}
      examResult={examResult}
      onSelectIndex={setCurrentIndex}
      onStartExam={handleStartExam}
      onSelectAnswer={handleSelectAnswer}
      onSubmitExam={handleSubmitExam}
      onFinish={handleFinish}
      onRestartExam={handleRestartExam}
    />
  );
};

