import { describe, it, expect } from 'vitest';
import { 
  shuffle, 
  createPRNG, 
  shuffleExerciseOptions, 
  selectRandom, 
  generateStudySession, 
  generateExamSession,
  generateDiagnosticSession,
  shuffleFormulaRushQuestion,
  shuffleProcedureQuestion,
  shuffleJeopardyQuestion,
  shuffleMysteryGraphQuestion,
  shuffleOrderProcedureSteps
} from '../randomEngine';
import { Exercise } from '../../types/domain';
import { EXERCISES_DATA } from '../../data/exercisesData';
import { FORMULA_RUSH_QUESTIONS, PROCEDURE_QUESTIONS, JEOPARDY_QUESTIONS, MYSTERY_GRAPH_QUESTIONS, ORDER_PROCEDURE_QUESTIONS } from '../../data/minigamesData';

describe('RandomEngine - Unit Tests', () => {

  describe('1. shuffle() - Fisher-Yates Core Algorithm', () => {
    it('does not lose or duplicate elements', () => {
      const original = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const result = shuffle(original);

      expect(result).toHaveLength(original.length);
      expect(result.sort((a, b) => a - b)).toEqual(original);
    });

    it('does not mutate the original array (pure function)', () => {
      const original = [10, 20, 30, 40];
      const clone = [...original];
      shuffle(original);
      expect(original).toEqual(clone);
    });

    it('safely handles empty array, null, or single-element array', () => {
      expect(shuffle([])).toEqual([]);
      expect(shuffle([42])).toEqual([42]);
      expect(shuffle(undefined as any)).toEqual([]);
    });

    it('produces different permutations across multiple runs on large arrays', () => {
      const original = Array.from({ length: 20 }, (_, i) => i + 1);
      const run1 = shuffle(original);
      const run2 = shuffle(original);

      // Statistically, the probability of two 20-element random shuffles being identical is 1 / 20! ≈ 4e-19
      expect(run1).not.toEqual(run2);
    });
  });

  describe('2. createPRNG() - Seeded Reproducibility (Mulberry32)', () => {
    it('produces exactly the same sequence for the same seed', () => {
      const prng1 = createPRNG(12345);
      const prng2 = createPRNG(12345);

      const seq1 = Array.from({ length: 10 }, () => prng1());
      const seq2 = Array.from({ length: 10 }, () => prng2());

      expect(seq1).toEqual(seq2);
    });

    it('produces different sequences for different seeds', () => {
      const prng1 = createPRNG(11111);
      const prng2 = createPRNG(99999);

      const val1 = prng1();
      const val2 = prng2();

      expect(val1).not.toEqual(val2);
    });
  });

  describe('3. shuffleExerciseOptions() - Option Randomization & Stable ID', () => {
    const mockExercise: Exercise = {
      id: 'mock_ex_1',
      unitId: 'U1',
      topicId: 'U1_T1',
      subtopicTitle: 'Test Subtopic',
      type: 'multiple_choice',
      difficulty: 2,
      promptLatex: '\\lim_{x\\to 0} f(x)',
      instructionText: 'Seleccione la respuesta',
      options: [
        { id: 'opt_a', textLatex: 'Respuesta Correcta', isCorrect: true },
        { id: 'opt_b', textLatex: 'Distractor 1', isCorrect: false, specificFeedback: 'Fallo 1' },
        { id: 'opt_c', textLatex: 'Distractor 2', isCorrect: false, specificFeedback: 'Fallo 2' },
        { id: 'opt_d', textLatex: 'Distractor 3', isCorrect: false, specificFeedback: 'Fallo 3' }
      ],
      correctOptionId: 'opt_a',
      hints: [],
      associatedFormulaIds: [],
      source: { document: 'Guia-TP-2025.pdf', unitNumber: 1, topicName: 'Test' },
      explanation: {
        whatYouDid: '',
        whereIsMistake: '',
        whyIsIncorrect: '',
        whatToDetectNextTime: '',
        correctResolutionLatex: '',
        examFreeTip: ''
      }
    };

    it('preserves all option contents and properties', () => {
      const randomized = shuffleExerciseOptions(mockExercise);
      expect(randomized.options).toHaveLength(4);

      const correctOpt = randomized.options.find(o => o.id === 'opt_a');
      expect(correctOpt).toBeDefined();
      expect(correctOpt?.isCorrect).toBe(true);
      expect(correctOpt?.textLatex).toBe('Respuesta Correcta');
    });

    it('preserves correctOptionId stably pointing to the option with isCorrect === true', () => {
      const randomized = shuffleExerciseOptions(mockExercise);
      expect(randomized.correctOptionId).toBe('opt_a');

      const found = randomized.options.find(o => o.id === randomized.correctOptionId);
      expect(found?.isCorrect).toBe(true);
    });

    it('varies the visual position of the correct option across 50 runs', () => {
      const positions: number[] = [];
      for (let i = 0; i < 50; i++) {
        const randomized = shuffleExerciseOptions(mockExercise);
        const correctIndex = randomized.options.findIndex(o => o.isCorrect);
        positions.push(correctIndex);
      }

      // The correct option should appear in at least 2 distinct positions across 50 runs
      const uniquePositions = new Set(positions);
      expect(uniquePositions.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('4. selectRandom() - Selection, Anti-Duplication and Boundary Handling', () => {
    const pool = [
      { id: 'e1' }, { id: 'e2' }, { id: 'e3' }, { id: 'e4' }, { id: 'e5' }
    ];

    it('does not produce duplicate elements within the selection', () => {
      const selected = selectRandom(pool, { count: 3 });
      expect(selected).toHaveLength(3);

      const ids = selected.map(s => s.id);
      expect(new Set(ids).size).toBe(3);
    });

    it('avoids excluded IDs when the remaining pool allows', () => {
      const selected = selectRandom(pool, {
        count: 2,
        excludeIds: ['e1', 'e2']
      });

      const ids = selected.map(s => s.id);
      expect(ids).not.toContain('e1');
      expect(ids).not.toContain('e2');
    });

    it('falls back gracefully when pool is smaller than count without throwing', () => {
      const selected = selectRandom(pool.slice(0, 2), { count: 5 });
      expect(selected).toHaveLength(2);
    });

    it('handles empty pool safely', () => {
      expect(selectRandom([], { count: 3 })).toEqual([]);
    });
  });

  describe('5. generateStudySession() - Pedagogical Filtering & Option Scrambling', () => {
    it('strictly respects unitId filtering', () => {
      const session = generateStudySession({
        pool: EXERCISES_DATA,
        unitId: 'U2',
        count: 3
      });

      expect(session).toHaveLength(3);
      session.forEach(ex => {
        expect(ex.unitId).toBe('U2');
      });
    });

    it('shuffles the options for every exercise in the session', () => {
      const session = generateStudySession({
        pool: EXERCISES_DATA,
        count: 5
      });

      session.forEach(ex => {
        const correctOption = ex.options.find(o => o.isCorrect);
        expect(correctOption).toBeDefined();
        expect(ex.correctOptionId).toBe(correctOption?.id);
      });
    });

    it('does not duplicate exercises within the same study session', () => {
      const session = generateStudySession({
        pool: EXERCISES_DATA,
        count: 5
      });

      const ids = session.map(s => s.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('6. generateExamSession() - Real Simulation of 10-Question Exam', () => {
    it('generates an exam with 10 questions covering all units U1..U10', () => {
      const exam = generateExamSession({ pool: EXERCISES_DATA });

      expect(exam.questions).toHaveLength(10);
      const unitsPresent = new Set(exam.questions.map(q => q.unitId));
      expect(unitsPresent.size).toBe(10);
    });

    it('scrambles the question order so it does not follow fixed U1..U10 sequence', () => {
      let isScrambled = false;
      for (let i = 0; i < 5; i++) {
        const exam = generateExamSession({ pool: EXERCISES_DATA });
        const unitOrder = exam.questions.map(q => q.unitId);
        const canonical = ['U1', 'U2', 'U3', 'U4', 'U5', 'U6', 'U7', 'U8', 'U9', 'U10'];
        if (JSON.stringify(unitOrder) !== JSON.stringify(canonical)) {
          isScrambled = true;
          break;
        }
      }
      expect(isScrambled).toBe(true);
    });

    it('shuffles options in all 10 exam questions while preserving answer validity', () => {
      const exam = generateExamSession({ pool: EXERCISES_DATA });

      exam.questions.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        expect(correctOpt).toBeDefined();
        expect(q.correctOptionId).toBe(correctOpt?.id);
      });
    });

    it('can be reproduced deterministically when given the same seed', () => {
      const seed = 987654;
      const exam1 = generateExamSession({ pool: EXERCISES_DATA, seed });
      const exam2 = generateExamSession({ pool: EXERCISES_DATA, seed });

      expect(exam1.questions.map(q => q.id)).toEqual(exam2.questions.map(q => q.id));
      expect(exam1.questions[0].options.map(o => o.id)).toEqual(exam2.questions[0].options.map(o => o.id));
    });

    it('generates different exams for different seeds', () => {
      const exam1 = generateExamSession({ pool: EXERCISES_DATA, seed: 1111 });
      const exam2 = generateExamSession({ pool: EXERCISES_DATA, seed: 2222 });

      expect(exam1.questions.map(q => q.id)).not.toEqual(exam2.questions.map(q => q.id));
    });
  });

  describe('7. generateDiagnosticSession() - Calibration Session', () => {
    it('generates 5 calibration questions covering core units with shuffled options', () => {
      const session = generateDiagnosticSession(EXERCISES_DATA);
      expect(session).toHaveLength(5);

      session.forEach(q => {
        const correctOpt = q.options.find(o => o.isCorrect);
        expect(correctOpt).toBeDefined();
        expect(q.correctOptionId).toBe(correctOpt?.id);
      });
    });
  });

  describe('8. Minigames Options Shufflers', () => {
    it('shuffles Formula Rush question options', () => {
      const q = FORMULA_RUSH_QUESTIONS[0];
      const shuffled = shuffleFormulaRushQuestion(q);

      expect(shuffled.formulaOptions).toHaveLength(q.formulaOptions.length);
      const correctOpt = shuffled.formulaOptions.find(o => o.isCorrect);
      expect(correctOpt).toBeDefined();
    });

    it('shuffles Procedure question options', () => {
      const q = PROCEDURE_QUESTIONS[0];
      const shuffled = shuffleProcedureQuestion(q);

      expect(shuffled.options).toHaveLength(q.options.length);
      const correctOpt = shuffled.options.find(o => o.isCorrect);
      expect(correctOpt).toBeDefined();
    });

    it('shuffles Jeopardy question options', () => {
      const q = JEOPARDY_QUESTIONS[0];
      const shuffled = shuffleJeopardyQuestion(q);

      expect(shuffled.options).toHaveLength(q.options.length);
      const correctOpt = shuffled.options.find(o => o.isCorrect);
      expect(correctOpt).toBeDefined();
    });

    it('shuffles Mystery Graph question options', () => {
      const q = MYSTERY_GRAPH_QUESTIONS[0];
      const shuffled = shuffleMysteryGraphQuestion(q);

      expect(shuffled.options).toHaveLength(q.options.length);
      const correctOpt = shuffled.options.find(o => o.isCorrect);
      expect(correctOpt).toBeDefined();
    });

    it('shuffles Order Procedure steps without starting already solved', () => {
      const q = ORDER_PROCEDURE_QUESTIONS[0];
      const steps = shuffleOrderProcedureSteps(q);

      expect(steps).toHaveLength(q.scrambledSteps.length);
      const isAlreadySolved = steps.every((s, idx) => s.correctOrderIndex === idx);
      expect(isAlreadySolved).toBe(false);
    });
  });

});

