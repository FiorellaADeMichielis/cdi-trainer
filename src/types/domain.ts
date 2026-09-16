export type UnitId = 'U1' | 'U2' | 'U3' | 'U4' | 'U5' | 'U6' | 'U7' | 'U8' | 'U9' | 'U10';

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5; 
// 1: Reconocimiento (definición/visual)
// 2: Aplicación directa (regla básica)
// 3: Aplicación combinada (varias reglas)
// 4: Problema complejo (análisis o demostración)
// 5: Nivel Examen Libre UNNE (problema integrador bajo presión)

export type ExerciseType = 
  | 'multiple_choice'
  | 'procedure_ordering'
  | 'error_detection'
  | 'direct_algebraic'
  | 'graphic_interpretation'
  | 'formula_rush'
  | 'step_by_step';

export type MistakeCategory = 
  | 'conceptual'
  | 'algebraic'
  | 'formula_confusion'
  | 'theorem_condition'
  | 'procedural';

export interface AcademicSource {
  document: 'Programa-CDI-LSI-R-2023.pdf' | 'UNNE- Calculo diferencial e integral.pdf' | 'Guia-TP-2022.pdf' | 'Guia-TP-2025.pdf';
  unitNumber: number;
  topicName: string;
  practicalWorkNumber?: number;
  exerciseNumber?: string;
  pageReference?: number;
}

export interface ScaffoldingHint {
  step: 1 | 2 | 3 | 4 | 5;
  title: string;
  contentLatex: string;
  penaltyXpPercentage: number;
}

export interface TeacherExplanation {
  whatYouDid: string;
  whereIsMistake: string;
  whyIsIncorrect: string;
  whatToDetectNextTime: string;
  correctResolutionLatex: string;
  examFreeTip: string;
}

export interface ExerciseOption {
  id: string;
  textLatex: string;
  isCorrect: boolean;
  specificFeedback?: string;
  mistakeCode?: string;
}

export interface Exercise {
  id: string;
  unitId: UnitId;
  topicId: string;
  subtopicTitle: string;
  type: ExerciseType;
  difficulty: DifficultyLevel;
  promptLatex: string;
  instructionText: string;
  options: ExerciseOption[];
  correctOptionId: string;
  hints: ScaffoldingHint[];
  associatedFormulaIds: string[];
  source: AcademicSource;
  explanation: TeacherExplanation;
  graphData?: {
    type: 'function_tangent' | 'riemann_sum' | 'level_curve' | 'step_discontinuity' | 'asymptote';
    fnExpr: string;
    domain: [number, number];
    paramA?: number;
    paramB?: number;
    label?: string;
  };
}

export interface FormulaVariable {
  symbol: string;
  meaning: string;
}

export interface FormulaCard {
  id: string;
  unitId: UnitId;
  topicTitle: string;
  name: string;
  latex: string;
  variables: FormulaVariable[];
  whenToUse: string;
  whenNotToUse: string;
  canonicalExampleLatex: string;
  frequentMistakes: string[];
  associatedExerciseIds: string[];
  sourceReference: string;
}

export interface ExerciseAttempt {
  id: string;
  exerciseId: string;
  unitId: UnitId;
  topicId: string;
  isCorrect: boolean;
  isForgot: boolean;
  selectedOptionId: string | null;
  hintsUsedCount: number;
  timeSpentSeconds: number;
  timestamp: number;
  mistakeCode?: string;
}

export interface MistakeRecord {
  mistakeKey: string;
  topicId: string;
  unitId: UnitId;
  description: string;
  frequency: number;
  lastOccurredAt: number;
  exampleExerciseId: string;
}

export interface SpacedCardReview {
  formulaId: string;
  intervalDays: number;
  repetitionCount: number;
  easeFactor: number;
  nextReviewTimestamp: number;
  lastReviewedTimestamp: number;
  consecutiveSuccess: number;
}

export interface UnitMastery {
  unitId: UnitId;
  unitName: string;
  percentage: number;
  conceptualMastery: number;
  proceduralMastery: number;
  formulaMastery: number;
  totalAttempts: number;
  correctAttempts: number;
  priorityLevel: 'CRITICA' | 'ALTA' | 'MEDIA' | 'DOMINADO';
}

export interface UserProfile {
  id: string;
  name: string;
  examDateTimestamp: number; // Defaults to 21-28 days from now
  availableHoursPerDay: number;
  daysAvailablePerWeek: number;
  worksOrStudies: boolean;
  confidenceLevel: 'bajo' | 'medio' | 'alto';
  totalXp: number;
  levelIndex: number; // 1 to 6
  levelTitle: string;
  studyStreakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  soundEnabled: boolean;
  diagnosticCompleted: boolean;
  dailyGoalMinutes: number;
  todayMinutesStudied: number;
  estimatedExamPassRate: number; // 0 to 100%
}

export interface StudyRecommendation {
  urgencyLevel: 'CRITICA' | 'ALTA' | 'MEDIA' | 'MANTENIMIENTO';
  suggestedDurationMinutes: number;
  targetUnitId: UnitId;
  targetTopicTitle: string;
  rationale: string;
  breakdown: {
    formulaReviewMinutes: number;
    targetedPracticeMinutes: number;
    minigameMinutes: number;
    challengeMinutes: number;
  };
  exerciseIds: string[];
  formulaIds: string[];
}

export interface ExamQuestionResult {
  exerciseId: string;
  unitId: UnitId;
  isCorrect: boolean;
  timeSpentSeconds: number;
  scoreEarned: number;
  maxScore: number;
}

export interface ExamSimulationResult {
  id: string;
  timestamp: number;
  totalScore: number; // 0 - 100
  durationSeconds: number;
  strengths: string[];
  weaknesses: string[];
  riskLevel: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  advice: string;
  resultsByUnit: Record<UnitId, { total: number; correct: number }>;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlocked: boolean;
  unlockedAt?: number;
  xpReward: number;
}
