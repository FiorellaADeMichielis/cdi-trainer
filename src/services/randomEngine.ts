import { Exercise, UnitId } from '../types/domain';
import { 
  FormulaRushQuestion, 
  ProcedureQuestion, 
  JeopardyQuestion, 
  MysteryGraphQuestion, 
  OrderProcedureQuestion,
  OrderProcedureStep 
} from '../data/minigamesData';

/**
 * Creates a deterministic 32-bit PRNG using the Mulberry32 algorithm.
 * Enables reproducible quiz and exam sessions given an integer seed.
 */
export function createPRNG(seed: number): () => number {
  let s = seed | 0;
  return function mulberry32(): number {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Pure, immutable Fisher-Yates (Knuth) shuffle algorithm.
 * Guarantees unbiased O(N) permutation without mutating the original array.
 */
export function shuffle<T>(array: readonly T[], rng: () => number = Math.random): T[] {
  if (!array || array.length <= 1) {
    return array ? [...array] : [];
  }
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Shuffles the options of an exercise while strictly preserving:
 * 1. The stable identification of the correct option (`correctOptionId` and `isCorrect: true`).
 * 2. Specific didactic feedback for each option.
 * 3. All hints and academic metadata.
 */
export function shuffleExerciseOptions(exercise: Exercise, rng: () => number = Math.random): Exercise {
  if (!exercise || !exercise.options || exercise.options.length <= 1) {
    return { ...exercise };
  }

  const shuffledOptions = shuffle(exercise.options, rng);
  const correctOption = shuffledOptions.find(o => o.isCorrect);

  return {
    ...exercise,
    options: shuffledOptions,
    correctOptionId: correctOption ? correctOption.id : exercise.correctOptionId
  };
}

/**
 * Shuffles options for Formula Rush questions.
 */
export function shuffleFormulaRushQuestion(q: FormulaRushQuestion, rng: () => number = Math.random): FormulaRushQuestion {
  return {
    ...q,
    formulaOptions: shuffle(q.formulaOptions, rng)
  };
}

/**
 * Shuffles options for Procedure Selector questions.
 */
export function shuffleProcedureQuestion(q: ProcedureQuestion, rng: () => number = Math.random): ProcedureQuestion {
  return {
    ...q,
    options: shuffle(q.options, rng)
  };
}

/**
 * Shuffles options for Jeopardy questions.
 */
export function shuffleJeopardyQuestion(q: JeopardyQuestion, rng: () => number = Math.random): JeopardyQuestion {
  return {
    ...q,
    options: shuffle(q.options, rng)
  };
}

/**
 * Shuffles options for Mystery Graph questions.
 */
export function shuffleMysteryGraphQuestion(q: MysteryGraphQuestion, rng: () => number = Math.random): MysteryGraphQuestion {
  return {
    ...q,
    options: shuffle(q.options, rng)
  };
}

/**
 * Shuffles the scrambled steps of an Order Procedure question ensuring
 * they do not accidentally end up in the already-solved order on initial presentation.
 */
export function shuffleOrderProcedureSteps(q: OrderProcedureQuestion, rng: () => number = Math.random): OrderProcedureStep[] {
  let steps = shuffle(q.scrambledSteps, rng);
  // If accidentally sorted, swap first two to ensure user has to interact
  if (steps.length > 1 && steps.every((s, idx) => s.correctOrderIndex === idx)) {
    steps = [steps[1], steps[0], ...steps.slice(2)];
  }
  return steps;
}

export interface SelectOptions<T> {
  count: number;
  excludeIds?: string[];
  getId?: (item: T) => string;
  rng?: () => number;
}

/**
 * Selects `count` items randomly from `pool`:
 * - Avoids items in `excludeIds` if the remaining pool is large enough.
 * - Never returns duplicates within the selected set.
 * - Gracefully falls back to using available items if the pool is smaller than `count`.
 */
export function selectRandom<T>(pool: readonly T[], options: SelectOptions<T>): T[] {
  if (!pool || pool.length === 0) return [];
  const { count, excludeIds = [], getId = (item: any) => item.id || '', rng = Math.random } = options;

  if (count <= 0) return [];

  // Filter out recently used items if enough items remain
  const filtered = pool.filter(item => !excludeIds.includes(getId(item)));
  const effectivePool = filtered.length >= count ? filtered : pool;

  const shuffled = shuffle(effectivePool, rng);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export interface StudySessionConfig {
  pool: readonly Exercise[];
  unitId?: UnitId;
  topicId?: string;
  count?: number;
  excludeIds?: string[];
  rng?: () => number;
}

/**
 * Generates an academically filtered and fully randomized study session:
 * 1. Filters pool by unit and/or topic first (Academic Logic).
 * 2. Avoids immediate consecutive repetitions if pool permits.
 * 3. Shuffles the questions order.
 * 4. Shuffles the options inside every question.
 */
export function generateStudySession(config: StudySessionConfig): Exercise[] {
  const { pool, unitId, topicId, count = 5, excludeIds = [], rng = Math.random } = config;

  let filteredPool = pool;
  if (unitId) {
    filteredPool = filteredPool.filter(e => e.unitId === unitId);
  }
  if (topicId) {
    filteredPool = filteredPool.filter(e => e.topicId === topicId);
  }

  if (filteredPool.length === 0) {
    filteredPool = pool; // Fallback to entire bank if filter yields empty
  }

  const selected = selectRandom(filteredPool, {
    count,
    excludeIds,
    getId: e => e.id,
    rng
  });

  return selected.map(ex => shuffleExerciseOptions(ex, rng));
}

export interface ExamSessionConfig {
  pool: readonly Exercise[];
  excludeIds?: string[];
  seed?: number;
  rng?: () => number;
}

export interface ExamSession {
  id: string;
  seed: number;
  questions: Exercise[];
  createdAt: number;
}

/**
 * Generates an official-style 10-question Exam Simulator session:
 * 1. Selects 1 question per official curricular unit (U1 to U10).
 * 2. Avoids repeating questions from the previous exam when multiple exist.
 * 3. Scrambles the 10 questions so the exam does NOT follow the predictable U1..U10 order.
 * 4. Scrambles options in all 10 questions.
 * 5. Returns a deterministic seed for reproducibility and session resumption.
 */
export function generateExamSession(config: ExamSessionConfig): ExamSession {
  const { pool, excludeIds = [], seed = Math.floor(Math.random() * 1000000) } = config;
  const rng = config.rng || createPRNG(seed);

  const units: UnitId[] = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10'];
  const selectedQuestions: Exercise[] = [];

  units.forEach(u => {
    const unitExercises = pool.filter(e => e.unitId === u);
    if (unitExercises.length > 0) {
      const chosen = selectRandom(unitExercises, {
        count: 1,
        excludeIds,
        getId: e => e.id,
        rng
      });
      if (chosen.length > 0) {
        selectedQuestions.push(chosen[0]);
      }
    }
  });

  // If pool lacked any unit, fill up to 10 from remaining exercises without duplicating
  if (selectedQuestions.length < 10) {
    const selectedIds = new Set(selectedQuestions.map(q => q.id));
    const remaining = pool.filter(e => !selectedIds.has(e.id));
    const extra = selectRandom(remaining, {
      count: 10 - selectedQuestions.length,
      getId: e => e.id,
      rng
    });
    selectedQuestions.push(...extra);
  }

  // Scramble the order of the exam questions
  const shuffledQuestions = shuffle(selectedQuestions, rng);

  // Scramble options for every question
  const finalQuestions = shuffledQuestions.map(q => shuffleExerciseOptions(q, rng));

  return {
    id: `exam_session_${Date.now()}_${seed}`,
    seed,
    questions: finalQuestions,
    createdAt: Date.now()
  };
}

/**
 * Generates 5 balanced calibration questions for the initial Diagnostic Modal:
 * Selects 1 exercise from each of U1, U2, U3, U4, U5, shuffles their options,
 * and presents them in an engaging, randomized order.
 */
export function generateDiagnosticSession(pool: readonly Exercise[], rng: () => number = Math.random): Exercise[] {
  const units: UnitId[] = ['U1', 'U2', 'U3', 'U4', 'U5'];
  const chosen: Exercise[] = [];

  units.forEach(u => {
    const unitExercises = pool.filter(e => e.unitId === u);
    if (unitExercises.length > 0) {
      const picked = selectRandom(unitExercises, { count: 1, rng });
      if (picked.length > 0) {
        chosen.push(picked[0]);
      }
    }
  });

  return shuffle(chosen, rng).map(ex => shuffleExerciseOptions(ex, rng));
}

