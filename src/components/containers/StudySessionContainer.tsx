import React from 'react';
import { Exercise, ExerciseAttempt, MistakeRecord } from '../../types/domain';
import { useStudySession } from '../../hooks/useStudySession';
import { StudySessionPresenter } from '../presentational/study/StudySessionPresenter';
import { ProfessorModal } from '../study/ProfessorModal';
import { SessionSummaryModal } from '../study/SessionSummaryModal';

interface StudySessionContainerProps {
  exercises: Exercise[];
  targetTopicTitle: string;
  durationMinutes: number;
  onRecordAttempt: (attempt: ExerciseAttempt, mistake?: MistakeRecord) => void;
  onFinishSession: () => void;
}

export const StudySessionContainer: React.FC<StudySessionContainerProps> = ({
  exercises,
  targetTopicTitle,
  durationMinutes,
  onRecordAttempt,
  onFinishSession
}) => {
  const {
    currentIndex,
    currentExercise,
    totalExercises,
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
  } = useStudySession({
    exercises,
    onRecordAttempt,
    onFinishSession
  });
  return (
    <div className="animate-fadeIn">
      <StudySessionPresenter
        currentExercise={currentExercise}
        currentIndex={currentIndex}
        totalExercises={totalExercises}
        timeSpentSeconds={timeSpentSeconds}
        durationMinutes={durationMinutes}
        targetTopicTitle={targetTopicTitle}
        selectedOptionId={selectedOptionId}
        isAnswered={isAnswered}
        revealedHintsCount={revealedHintsCount}
        onSelectOption={handleSelectOption}
        onSubmitAnswer={handleSubmitAnswer}
        onRevealNextHint={handleRevealNextHint}
        onDontRemember={handleDontRemember}
        onNextExercise={handleNextExercise}
        onOpenProfessorModal={() => setShowProfessorModal(true)}
        onOpenSummaryModal={() => setShowSummaryModal(true)}
      />

      {/* Professor Pedagogical Feedback Modal */}
      {showProfessorModal && currentExercise.explanation && (
        <ProfessorModal
          isOpen={showProfessorModal}
          onClose={() => setShowProfessorModal(false)}
          explanation={currentExercise.explanation}
        />
      )}

      {/* Session Summary Modal */}
      {showSummaryModal && (
        <SessionSummaryModal
          isOpen={showSummaryModal}
          onClose={handleCloseSession}
          durationMinutes={durationMinutes}
          totalExercises={totalExercises}
          correctExercises={correctCount}
          incorrectExercises={Math.max(0, (currentIndex + (isAnswered ? 1 : 0)) - correctCount)}
          xpEarned={sessionScore}
          masteryGain={Math.round((correctCount / totalExercises) * 15)}
          targetTopicTitle={targetTopicTitle}
          nextStepAdvice="Revisa las unidades recomendadas por la cátedra para consolidar los temas débiles."
        />
      )}
    </div>
  );
};
