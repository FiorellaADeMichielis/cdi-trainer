import { useState, useEffect, useCallback } from 'react';
import { 
  FORMULA_RUSH_QUESTIONS, 
  PROCEDURE_QUESTIONS, 
  DETECTIVE_QUESTIONS, 
  ORDER_PROCEDURE_QUESTIONS, 
  MYSTERY_GRAPH_QUESTIONS,
  JeopardyQuestion
} from '../data/minigamesData';
import { soundService } from '../services/soundService';

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
  const [rushIndex, setRushIndex] = useState<number>(0);
  const [rushTimeLeft, setRushTimeLeft] = useState<number>(8);
  const [rushGameOver, setRushGameOver] = useState<boolean>(false);

  // --- Procedure Selector ---
  const [procedureIndex, setProcedureIndex] = useState<number>(0);
  const [selectedProcedureOption, setSelectedProcedureOption] = useState<string | null>(null);

  // --- Math Detective ---
  const [detectiveIndex, setDetectiveIndex] = useState<number>(0);
  const [selectedFlawedStep, setSelectedFlawedStep] = useState<number | null>(null);

  // --- Order Procedure ---
  const [orderSteps, setOrderSteps] = useState<OrderProcedureStep[]>(() => [...ORDER_PROCEDURE_QUESTIONS[0].scrambledSteps]);
  const [orderEvaluated, setOrderEvaluated] = useState<boolean>(false);
  const [orderIsCorrect, setOrderIsCorrect] = useState<boolean>(false);

  // --- Formula Memory ---
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);

  // --- Mystery Graph ---
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

    if (rushIndex + 1 < FORMULA_RUSH_QUESTIONS.length) {
      setRushIndex(prev => prev + 1);
      setRushTimeLeft(8);
    } else {
      setRushGameOver(true);
    }
  }, [rushTimeLeft, rushIndex, onEarnXp]);

  // 2. Procedure Selector logic
  const startProcedureSelector = useCallback(() => {
    soundService.playClick();
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
    if (procedureIndex + 1 < PROCEDURE_QUESTIONS.length) {
      setProcedureIndex(prev => prev + 1);
      setSelectedProcedureOption(null);
    } else {
      setActiveGame('hub');
    }
  }, [procedureIndex]);

  // 3. Detective logic
  const startDetective = useCallback(() => {
    soundService.playClick();
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
    if (detectiveIndex + 1 < DETECTIVE_QUESTIONS.length) {
      setDetectiveIndex(prev => prev + 1);
      setSelectedFlawedStep(null);
    } else {
      setActiveGame('hub');
    }
  }, [detectiveIndex]);

  // 4. Order Procedure logic
  const startOrderProcedure = useCallback(() => {
    soundService.playClick();
    setActiveGame('order_procedure');
    setOrderSteps([...ORDER_PROCEDURE_QUESTIONS[0].scrambledSteps]);
    setOrderEvaluated(false);
    setOrderIsCorrect(false);
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
    setMemoryCards(cards.sort(() => Math.random() - 0.5));
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
    if (mysteryIndex + 1 < MYSTERY_GRAPH_QUESTIONS.length) {
      setMysteryIndex(prev => prev + 1);
      setSelectedMysteryOption(null);
    } else {
      setActiveGame('hub');
    }
  }, [mysteryIndex]);

  // 7. Jeopardy logic
  const startJeopardy = useCallback(() => {
    soundService.playClick();
    setActiveGame('jeopardy');
    setSelectedJeopardyQ(null);
    setJeopardyFeedback(null);
  }, []);

  const handleSelectJeopardyQ = useCallback((q: JeopardyQuestion) => {
    soundService.playClick();
    setSelectedJeopardyQ(q);
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
  };
};
