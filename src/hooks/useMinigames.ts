import { useState, useEffect, useCallback } from 'react';
import { 
  FORMULA_RUSH_QUESTIONS, 
  PROCEDURE_QUESTIONS, 
  DETECTIVE_QUESTIONS, 
  ORDER_PROCEDURE_QUESTIONS, 
  MYSTERY_GRAPH_QUESTIONS,
  FormulaRushQuestion,
  ProcedureQuestion,
  DetectiveQuestion,
  OrderProcedureQuestion,
  MysteryGraphQuestion,
  JeopardyQuestion
} from '../data/minigamesData';
import { soundService } from '../services/soundService';
import {
  shuffle,
  shuffleFormulaRushQuestion,
  shuffleProcedureQuestion,
  shuffleJeopardyQuestion,
  shuffleMysteryGraphQuestion,
  shuffleOrderProcedureSteps,
  selectRandom
} from '../services/randomEngine';

const FORMULA_PAIRS = [
  { pairId: '1', concept: 'Regla de la Cadena', formulaLatex: "f'(g(x)) \\cdot g'(x)" },
  { pairId: '2', concept: 'Regla de Barrow', formulaLatex: 'F(b) - F(a)' },
  { pairId: '3', concept: 'Derivada del Producto', formulaLatex: "u'v + uv'" },
  { pairId: '4', concept: 'Serie Geométrica (|q|<1)', formulaLatex: '\\frac{a}{1-q}' }
];

export type MinigameId = 
  | 'hub' 
  | 'formula_rush' 
  | 'procedure_selector' 
  | 'math_detective' 
  | 'order_procedure' 
  | 'formula_memory' 
  | 'mystery_graph' 
  | 'jeopardy' 
  | 'clock_battle';

export interface MemoryCard {
  id: string;
  pairId: string;
  text: string;
  isLatex: boolean;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface OrderProcedureStep {
  id: string;
  correctOrderIndex: number;
  textLatex: string;
}

interface UseMinigamesProps {
  onEarnXp: (xp: number) => void;
}

export const useMinigames = ({ onEarnXp }: UseMinigamesProps) => {
  const [activeGame, setActiveGame] = useState<MinigameId>('hub');
  const [currentScore, setCurrentScore] = useState<number>(0);

  // --- Formula Rush ---
  const [rushQuestions, setRushQuestions] = useState<FormulaRushQuestion[]>(() =>
    shuffle(FORMULA_RUSH_QUESTIONS).map(q => shuffleFormulaRushQuestion(q))
  );
  const [rushIndex, setRushIndex] = useState<number>(0);
  const [rushTimeLeft, setRushTimeLeft] = useState<number>(8);
  const [rushGameOver, setRushGameOver] = useState<boolean>(false);

  // --- Procedure Selector ---
  const [procedureQuestions, setProcedureQuestions] = useState<ProcedureQuestion[]>(() =>
    shuffle(PROCEDURE_QUESTIONS).map(q => shuffleProcedureQuestion(q))
  );
  const [procedureIndex, setProcedureIndex] = useState<number>(0);
  const [selectedProcedureOption, setSelectedProcedureOption] = useState<string | null>(null);

  // --- Math Detective ---
  const [detectiveQuestions, setDetectiveQuestions] = useState<DetectiveQuestion[]>(() =>
    shuffle(DETECTIVE_QUESTIONS)
  );
  const [detectiveIndex, setDetectiveIndex] = useState<number>(0);
  const [selectedFlawedStep, setSelectedFlawedStep] = useState<number | null>(null);

  // --- Order Procedure ---
  const [orderCurrentTask, setOrderCurrentTask] = useState<OrderProcedureQuestion>(() =>
    selectRandom(ORDER_PROCEDURE_QUESTIONS, { count: 1 })[0] || ORDER_PROCEDURE_QUESTIONS[0]
  );
  const [orderSteps, setOrderSteps] = useState<OrderProcedureStep[]>(() =>
    shuffleOrderProcedureSteps(ORDER_PROCEDURE_QUESTIONS[0])
  );
  const [orderEvaluated, setOrderEvaluated] = useState<boolean>(false);
  const [orderIsCorrect, setOrderIsCorrect] = useState<boolean>(false);

  // --- Formula Memory ---
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // --- Mystery Graph ---
  const [mysteryQuestions, setMysteryQuestions] = useState<MysteryGraphQuestion[]>(() =>
    shuffle(MYSTERY_GRAPH_QUESTIONS).map(q => shuffleMysteryGraphQuestion(q))
  );
  const [mysteryIndex, setMysteryIndex] = useState<number>(0);
  const [selectedMysteryOption, setSelectedMysteryOption] = useState<string | null>(null);

  // --- Jeopardy ---
  const [selectedJeopardyQ, setSelectedJeopardyQ] = useState<JeopardyQuestion | null>(null);
  const [answeredJeopardyIds, setAnsweredJeopardyIds] = useState<string[]>([]);
  const [jeopardyFeedback, setJeopardyFeedback] = useState<string | null>(null);

  // Reset helper
  const navigateToHub = useCallback(() => {
    soundService.playClick();
    setActiveGame('hub');
  }, []);

  // 1. Formula Rush logic
  const startFormulaRush = useCallback(() => {
    soundService.playClick();
    const randomized = shuffle(FORMULA_RUSH_QUESTIONS).map(q => shuffleFormulaRushQuestion(q));
    setRushQuestions(randomized);
    setActiveGame('formula_rush');
    setRushIndex(0);
    setRushTimeLeft(8);
    setRushGameOver(false);
    setCurrentScore(0);
  }, []);

  useEffect(() => {
    if (activeGame !== 'formula_rush' || rushGameOver) return;
    const timer = setInterval(() => {
      setRushTimeLeft(prev => {
        if (prev <= 1) {
          handleFormulaRushAnswer(false);
          return 8;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [activeGame, rushGameOver, rushIndex]);

  const handleFormulaRushAnswer = useCallback((isCorrect: boolean) => {
    if (isCorrect) {
      soundService.playCorrect();
      const points = 50 + rushTimeLeft * 5;
      setCurrentScore(prev => prev + points);
      onEarnXp(points);
    } else {
      soundService.playIncorrect();
    }

    if (rushIndex + 1 < rushQuestions.length) {
      setRushIndex(prev => prev + 1);
      setRushTimeLeft(8);
    } else {
      setRushGameOver(true);
    }
  }, [rushTimeLeft, rushIndex, rushQuestions.length, onEarnXp]);

  // 2. Procedure Selector logic
  const startProcedureSelector = useCallback(() => {
    soundService.playClick();
    const randomized = shuffle(PROCEDURE_QUESTIONS).map(q => shuffleProcedureQuestion(q));
    setProcedureQuestions(randomized);
    setActiveGame('procedure_selector');
    setProcedureIndex(0);
    setSelectedProcedureOption(null);
  }, []);

  const handleProcedureAnswer = useCallback((optionId: string, isCorrect: boolean) => {
    if (selectedProcedureOption !== null) return;
    setSelectedProcedureOption(optionId);
    if (isCorrect) {
      soundService.playCorrect();
      onEarnXp(40);
    } else {
      soundService.playIncorrect();
    }
  }, [selectedProcedureOption, onEarnXp]);

  const nextProcedureQuestion = useCallback(() => {
    soundService.playClick();
    if (procedureIndex + 1 < procedureQuestions.length) {
      setProcedureIndex(prev => prev + 1);
      setSelectedProcedureOption(null);
    } else {
      setActiveGame('hub');
    }
  }, [procedureIndex, procedureQuestions.length]);

  // 3. Detective logic
  const startDetective = useCallback(() => {
    soundService.playClick();
    const randomized = shuffle(DETECTIVE_QUESTIONS);
    setDetectiveQuestions(randomized);
    setActiveGame('math_detective');
    setDetectiveIndex(0);
    setSelectedFlawedStep(null);
  }, []);

  const handleDetectiveSelectStep = useCallback((stepNumber: number, isFlawed: boolean) => {
    if (selectedFlawedStep !== null) return;
    setSelectedFlawedStep(stepNumber);
    if (isFlawed) {
      soundService.playCorrect();
      onEarnXp(100);
    } else {
      soundService.playIncorrect();
    }
  }, [selectedFlawedStep, onEarnXp]);

  const nextDetectiveQuestion = useCallback(() => {
    soundService.playClick();
    if (detectiveIndex + 1 < detectiveQuestions.length) {
      setDetectiveIndex(prev => prev + 1);
      setSelectedFlawedStep(null);
    } else {
      setActiveGame('hub');
    }
  }, [detectiveIndex, detectiveQuestions.length]);

  // 4. Order Procedure logic
  const startOrderProcedure = useCallback(() => {
    soundService.playClick();
    const randomTask = selectRandom(ORDER_PROCEDURE_QUESTIONS, { count: 1 })[0] || ORDER_PROCEDURE_QUESTIONS[0];
    setOrderCurrentTask(randomTask);
    setOrderSteps(shuffleOrderProcedureSteps(randomTask));
    setOrderEvaluated(false);
    setOrderIsCorrect(false);
    setActiveGame('order_procedure');
  }, []);

  const moveOrderStep = useCallback((fromIndex: number, toIndex: number) => {
    if (orderEvaluated) return;
    soundService.playClick();
    setOrderSteps(prev => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
  }, [orderEvaluated]);

  const checkOrderProcedure = useCallback(() => {
    let correct = true;
    for (let i = 0; i < orderSteps.length; i++) {
      if (orderSteps[i].correctOrderIndex !== i) {
        correct = false;
        break;
      }
    }
    setOrderEvaluated(true);
    setOrderIsCorrect(correct);
    if (correct) {
      soundService.playCorrect();
      onEarnXp(75);
    } else {
      soundService.playIncorrect();
    }
  }, [orderSteps, onEarnXp]);

  // 5. Memory logic
  const startMemoryGame = useCallback(() => {
    soundService.playClick();
    setActiveGame('formula_memory');
    const cards: MemoryCard[] = [];
    FORMULA_PAIRS.forEach((pair) => {
      cards.push({
        id: `${pair.pairId}_concept`,
        pairId: pair.pairId,
        text: pair.concept,
        isLatex: false,
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: `${pair.pairId}_formula`,
        pairId: pair.pairId,
        text: pair.formulaLatex,
        isLatex: true,
        isFlipped: false,
        isMatched: false
      });
    });
    setMemoryCards(shuffle(cards));
    setFlippedIndices([]);
  }, []);

  const handleFlipMemoryCard = useCallback((cardIndex: number) => {
    if (flippedIndices.length >= 2 || memoryCards[cardIndex].isFlipped || memoryCards[cardIndex].isMatched) return;
    soundService.playClick();
    const newCards = [...memoryCards];
    newCards[cardIndex].isFlipped = true;
    setMemoryCards(newCards);

    const newFlipped = [...flippedIndices, cardIndex];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      const [idx1, idx2] = newFlipped;
      if (newCards[idx1].pairId === newCards[idx2].pairId) {
        soundService.playCorrect();
        onEarnXp(30);
        setTimeout(() => {
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 500);
      } else {
        setTimeout(() => {
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setMemoryCards([...newCards]);
          setFlippedIndices([]);
        }, 1000);
      }
    }
  }, [flippedIndices, memoryCards, onEarnXp]);

  // 6. Mystery Graph logic
  const startMysteryGraph = useCallback(() => {
    soundService.playClick();
    const randomized = shuffle(MYSTERY_GRAPH_QUESTIONS).map(q => shuffleMysteryGraphQuestion(q));
    setMysteryQuestions(randomized);
    setActiveGame('mystery_graph');
    setMysteryIndex(0);
    setSelectedMysteryOption(null);
  }, []);

  const handleMysteryOptionSelect = useCallback((optionId: string, isCorrect: boolean) => {
    if (selectedMysteryOption !== null) return;
    setSelectedMysteryOption(optionId);
    if (isCorrect) {
      soundService.playCorrect();
      onEarnXp(80);
    } else {
      soundService.playIncorrect();
    }
  }, [selectedMysteryOption, onEarnXp]);

  const nextMysteryGraph = useCallback(() => {
    soundService.playClick();
    if (mysteryIndex + 1 < mysteryQuestions.length) {
      setMysteryIndex(prev => prev + 1);
      setSelectedMysteryOption(null);
    } else {
      setActiveGame('hub');
    }
  }, [mysteryIndex, mysteryQuestions.length]);

  // 7. Jeopardy logic
  const startJeopardy = useCallback(() => {
    soundService.playClick();
    setActiveGame('jeopardy');
    setSelectedJeopardyQ(null);
    setJeopardyFeedback(null);
  }, []);

  const handleSelectJeopardyQ = useCallback((q: JeopardyQuestion) => {
    soundService.playClick();
    setSelectedJeopardyQ(shuffleJeopardyQuestion(q));
    setJeopardyFeedback(null);
  }, []);

  const handleAnswerJeopardy = useCallback((_optionId: string, isCorrect: boolean) => {
    if (!selectedJeopardyQ) return;
    setAnsweredJeopardyIds(prev => [...prev, selectedJeopardyQ.id]);

    if (isCorrect) {
      soundService.playCorrect();
      setCurrentScore(prev => prev + selectedJeopardyQ.points);
      onEarnXp(selectedJeopardyQ.points);
      setJeopardyFeedback(`¡Correcto! Sumaste +${selectedJeopardyQ.points} puntos.`);
    } else {
      soundService.playIncorrect();
      setJeopardyFeedback(`Incorrecto. Explicación: ${selectedJeopardyQ.explanation}`);
    }
  }, [selectedJeopardyQ, onEarnXp]);

  const closeJeopardyQuestion = useCallback(() => {
    soundService.playClick();
    setSelectedJeopardyQ(null);
    setJeopardyFeedback(null);
  }, []);

  // 8. Clock battle
  const startClockBattle = useCallback(() => {
    soundService.playClick();
    setActiveGame('clock_battle');
  }, []);

  const completeClockBattle = useCallback(() => {
    soundService.playCorrect();
    onEarnXp(120);
    setActiveGame('hub');
  }, [onEarnXp]);

  return {
    activeGame,
    currentScore,
    rushIndex,
    rushTimeLeft,
    rushGameOver,
    currentRushQuestion: rushQuestions[rushIndex] || rushQuestions[0],
    totalRushQuestions: rushQuestions.length,
    procedureIndex,
    selectedProcedureOption,
    currentProcedureQuestion: procedureQuestions[procedureIndex] || procedureQuestions[0],
    totalProcedureQuestions: procedureQuestions.length,
    detectiveIndex,
    selectedFlawedStep,
    currentDetectiveCase: detectiveQuestions[detectiveIndex] || detectiveQuestions[0],
    totalDetectiveCases: detectiveQuestions.length,
    orderCurrentTask,
    orderSteps,
    orderEvaluated,
    orderIsCorrect,
    memoryCards,
    mysteryIndex,
    selectedMysteryOption,
    currentMysteryQuestion: mysteryQuestions[mysteryIndex] || mysteryQuestions[0],
    totalMysteryQuestions: mysteryQuestions.length,
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
  };
};
