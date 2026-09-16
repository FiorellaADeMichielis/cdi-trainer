import React from 'react';
import { useMinigames } from '../../hooks/useMinigames';
import { MinigameHubPresenter } from '../presentational/minigames/MinigameHubPresenter';
import { FormulaRushGame } from '../presentational/minigames/FormulaRushGame';
import { ProcedureSelectorGame } from '../presentational/minigames/ProcedureSelectorGame';
import { MathDetectiveGame } from '../presentational/minigames/MathDetectiveGame';
import { OrderProcedureGame } from '../presentational/minigames/OrderProcedureGame';
import { FormulaMemoryGame } from '../presentational/minigames/FormulaMemoryGame';
import { MysteryGraphGame } from '../presentational/minigames/MysteryGraphGame';
import { JeopardyBoardGame } from '../presentational/minigames/JeopardyBoardGame';
import { ClockBattleGame } from '../presentational/minigames/ClockBattleGame';

interface MinigameArenaContainerProps {
  onEarnXp: (xp: number) => void;
}

export const MinigameArenaContainer: React.FC<MinigameArenaContainerProps> = ({
  onEarnXp
}) => {
  const {
    activeGame,
    currentScore,
    rushIndex,
    rushTimeLeft,
    rushGameOver,
    procedureIndex,
    selectedProcedureOption,
    detectiveIndex,
    selectedFlawedStep,
    orderSteps,
    orderEvaluated,
    orderIsCorrect,
    memoryCards,
    mysteryIndex,
    selectedMysteryOption,
    selectedJeopardyQ,
    answeredJeopardyIds,
    jeopardyFeedback,
    navigateToHub,
    startFormulaRush,
    handleFormulaRushAnswer,
    startProcedureSelector,
    handleProcedureAnswer,
    nextProcedureQuestion,
    startDetective,
    handleDetectiveSelectStep,
    nextDetectiveQuestion,
    startOrderProcedure,
    moveOrderStep,
    checkOrderProcedure,
    startMemoryGame,
    handleFlipMemoryCard,
    startMysteryGraph,
    handleMysteryOptionSelect,
    nextMysteryGraph,
    startJeopardy,
    handleSelectJeopardyQ,
    handleAnswerJeopardy,
    closeJeopardyQuestion,
    startClockBattle,
    completeClockBattle
  } = useMinigames({ onEarnXp });

  const handleSelectGame = (gameId: string) => {
    switch (gameId) {
      case 'formula_rush': startFormulaRush(); break;
      case 'procedure_selector': startProcedureSelector(); break;
      case 'math_detective': startDetective(); break;
      case 'order_procedure': startOrderProcedure(); break;
      case 'formula_memory': startMemoryGame(); break;
      case 'mystery_graph': startMysteryGraph(); break;
      case 'jeopardy': startJeopardy(); break;
      case 'clock_battle': startClockBattle(); break;
      default: navigateToHub(); break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fadeIn">
      {activeGame === 'hub' && (
        <MinigameHubPresenter onSelectGame={handleSelectGame} />
      )}

      {activeGame === 'formula_rush' && (
        <FormulaRushGame
          rushIndex={rushIndex}
          rushTimeLeft={rushTimeLeft}
          currentScore={currentScore}
          gameOver={rushGameOver}
          onAnswer={handleFormulaRushAnswer}
          onRestart={startFormulaRush}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'procedure_selector' && (
        <ProcedureSelectorGame
          procedureIndex={procedureIndex}
          selectedOptionId={selectedProcedureOption}
          onAnswer={handleProcedureAnswer}
          onNext={nextProcedureQuestion}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'math_detective' && (
        <MathDetectiveGame
          detectiveIndex={detectiveIndex}
          selectedFlawedStep={selectedFlawedStep}
          onSelectStep={handleDetectiveSelectStep}
          onNext={nextDetectiveQuestion}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'order_procedure' && (
        <OrderProcedureGame
          orderSteps={orderSteps}
          orderEvaluated={orderEvaluated}
          orderIsCorrect={orderIsCorrect}
          onMoveStep={moveOrderStep}
          onCheckOrder={checkOrderProcedure}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'formula_memory' && (
        <FormulaMemoryGame
          memoryCards={memoryCards}
          onFlipCard={handleFlipMemoryCard}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'mystery_graph' && (
        <MysteryGraphGame
          mysteryIndex={mysteryIndex}
          selectedMysteryOption={selectedMysteryOption}
          onSelectOption={handleMysteryOptionSelect}
          onNext={nextMysteryGraph}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'jeopardy' && (
        <JeopardyBoardGame
          currentScore={currentScore}
          selectedQ={selectedJeopardyQ}
          answeredIds={answeredJeopardyIds}
          feedback={jeopardyFeedback}
          onSelectQ={handleSelectJeopardyQ}
          onAnswerQ={handleAnswerJeopardy}
          onCloseQ={closeJeopardyQuestion}
          onBackToHub={navigateToHub}
        />
      )}

      {activeGame === 'clock_battle' && (
        <ClockBattleGame
          onComplete={completeClockBattle}
          onBackToHub={navigateToHub}
        />
      )}
    </div>
  );
};

