import { UnitId, UnitMastery, ExerciseAttempt, MistakeRecord } from '../types/domain';
import { CURRICULA_UNITS } from '../data/curriculaData';

export class MasteryEngine {
  /**
   * Calculates readiness percentage using weighted curricular coverage,
   * recent accuracy, retention factor, and simulation performance.
   */
  public static calculateOverallReadiness(
    unitMasteries: Record<UnitId, UnitMastery>,
    attempts: ExerciseAttempt[],
    examSimulationScores: number[]
  ): number {
    // 1. Weighted Curricular Mastery
    let weightedMasterySum = 0;
    let totalWeight = 0;

    CURRICULA_UNITS.forEach(unit => {
      const mastery = unitMasteries[unit.id]?.percentage || 0;
      weightedMasterySum += mastery * (unit.examWeightPercentage / 100);
      totalWeight += unit.examWeightPercentage;
    });

    const curricularMastery = totalWeight > 0 ? (weightedMasterySum / totalWeight) * 100 : 0;

    // 2. Recent Accuracy (last 30 attempts, exponential weighting)
    const recentAttempts = attempts.slice(-30);
    let recentAccuracy = 0;
    if (recentAttempts.length > 0) {
      let weightedHits = 0;
      let weightSum = 0;
      recentAttempts.forEach((att, index) => {
        const w = 1 + (index / recentAttempts.length); // recent attempts have up to 2x weight
        if (att.isCorrect) weightedHits += w;
        weightSum += w;
      });
      recentAccuracy = (weightedHits / weightSum) * 100;
    }

    // 3. Exam Simulation Score
    let simScore = 0;
    if (examSimulationScores.length > 0) {
      // average of last 3 simulations
      const recentSims = examSimulationScores.slice(-3);
      simScore = recentSims.reduce((a, b) => a + b, 0) / recentSims.length;
    } else {
      // If no simulation taken yet, rely on recent practice but cap conservative expectation
      simScore = Math.max(0, recentAccuracy * 0.7);
    }

    // Combined formulation
    const pPrep = (0.50 * curricularMastery) + (0.30 * recentAccuracy) + (0.20 * simScore);
    return Math.min(100, Math.max(0, Math.round(pPrep)));
  }

  /**
   * Updates unit mastery given a new exercise attempt
   */
  public static updateUnitMastery(
    currentMastery: UnitMastery,
    attempt: ExerciseAttempt
  ): UnitMastery {
    const totalAttempts = currentMastery.totalAttempts + 1;
    const correctAttempts = currentMastery.correctAttempts + (attempt.isCorrect ? 1 : 0);

    // Delta based on hints and correct status
    const hintFactor = Math.max(0.2, 1 - (attempt.hintsUsedCount * 0.15));
    const delta = attempt.isCorrect ? (8 * hintFactor) : -6;

    let newPercentage = Math.min(100, Math.max(0, currentMastery.percentage + delta));
    if (attempt.isForgot) {
      newPercentage = Math.max(0, currentMastery.percentage - 8);
    }

    let priority: 'CRITICA' | 'ALTA' | 'MEDIA' | 'DOMINADO';
    if (newPercentage < 40) {
      priority = 'CRITICA';
    } else if (newPercentage < 65) {
      priority = 'ALTA';
    } else if (newPercentage < 85) {
      priority = 'MEDIA';
    } else {
      priority = 'DOMINADO';
    }

    return {
      ...currentMastery,
      totalAttempts,
      correctAttempts,
      percentage: Math.round(newPercentage),
      priorityLevel: priority
    };
  }

  /**
   * Detects critical weak units and topics that demand immediate intervention
   */
  public static detectCriticalWeaknesses(
    unitMasteries: Record<UnitId, UnitMastery>,
    mistakes: MistakeRecord[]
  ): { unitId: UnitId; unitTitle: string; percentage: number; rationale: string }[] {
    const weaknesses: { unitId: UnitId; unitTitle: string; percentage: number; rationale: string }[] = [];

    CURRICULA_UNITS.forEach(unit => {
      const mastery = unitMasteries[unit.id]?.percentage || 0;
      const unitMistakes = mistakes.filter(m => m.unitId === unit.id);
      const mistakeFreq = unitMistakes.reduce((sum, m) => sum + m.frequency, 0);

      if (mastery < 60 || mistakeFreq >= 3) {
        let rationale = `Dominio bajo (${mastery}%). `;
        if (unitMistakes.length > 0) {
          const topMistake = unitMistakes.sort((a, b) => b.frequency - a.frequency)[0];
          rationale += `Debilidad detectada: ${topMistake.description} (${topMistake.frequency} veces).`;
        } else {
          rationale += `Requiere práctica activa urgente antes del examen.`;
        }

        weaknesses.push({
          unitId: unit.id,
          unitTitle: unit.title,
          percentage: mastery,
          rationale
        });
      }
    });

    return weaknesses.sort((a, b) => a.percentage - b.percentage);
  }
}
