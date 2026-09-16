import { UnitId, UnitMastery, MistakeRecord, StudyRecommendation } from '../types/domain';
import { CURRICULA_UNITS } from '../data/curriculaData';
import { EXERCISES_DATA } from '../data/exercisesData';
import { FORMULA_CARDS } from '../data/formulasData';

export class RecommendationEngine {
  /**
   * Generates dynamic study recommendation based on days remaining, available minutes and weak spots.
   */
  public static recommendSession(
    daysRemaining: number,
    availableMinutes: number,
    unitMasteries: Record<UnitId, UnitMastery>,
    mistakes: MistakeRecord[]
  ): StudyRecommendation {
    // 1. Check if in Last 24 Hours or Last 7 Days mode
    const isLast24Hours = daysRemaining <= 1;
    const isLast7Days = daysRemaining <= 7;

    // 2. Identify highest priority unit (weakest mastery with highest exam weight)
    let candidateUnits = CURRICULA_UNITS.map(unit => {
      const mastery = unitMasteries[unit.id]?.percentage || 0;
      const weight = unit.examWeightPercentage;
      const unitMistakes = mistakes.filter(m => m.unitId === unit.id);
      const mistakePoints = unitMistakes.reduce((sum, m) => sum + m.frequency * 5, 0);

      // Score: high priority if low mastery, high exam weight, and high mistake frequency
      const priorityScore = ((100 - mastery) * 1.5) + (weight * 1.2) + mistakePoints;

      return {
        unit,
        mastery,
        priorityScore
      };
    });

    candidateUnits.sort((a, b) => b.priorityScore - a.priorityScore);
    const targetUnit = candidateUnits[0].unit;
    const targetMastery = candidateUnits[0].mastery;

    // 3. Select relevant exercises and formulas for this target unit
    const unitExercises = EXERCISES_DATA.filter(ex => ex.unitId === targetUnit.id);
    const exerciseIds = unitExercises.length > 0 
      ? unitExercises.map(ex => ex.id)
      : EXERCISES_DATA.slice(0, 3).map(e => e.id);

    const unitFormulas = FORMULA_CARDS.filter(f => f.unitId === targetUnit.id);
    const formulaIds = unitFormulas.length > 0
      ? unitFormulas.map(f => f.id)
      : FORMULA_CARDS.slice(0, 2).map(f => f.id);

    // 4. Time breakdown according to availableMinutes
    let breakdown = {
      formulaReviewMinutes: Math.round(availableMinutes * 0.2),
      targetedPracticeMinutes: Math.round(availableMinutes * 0.5),
      minigameMinutes: Math.round(availableMinutes * 0.15),
      challengeMinutes: Math.round(availableMinutes * 0.15)
    };

    let urgency: 'CRITICA' | 'ALTA' | 'MEDIA' | 'MANTENIMIENTO' = 'ALTA';
    if (targetMastery < 45 || isLast7Days) urgency = 'CRITICA';
    else if (targetMastery > 75) urgency = 'MEDIA';

    // Rationale text
    let rationale = '';
    if (isLast24Hours) {
      rationale = `¡Examen en 24h! Protocolo anti-pánico: repaso activo de fórmulas débiles y 2 problemas clave de ${targetUnit.title}. Evita desgastarte.`;
      breakdown = {
        formulaReviewMinutes: Math.round(availableMinutes * 0.5),
        targetedPracticeMinutes: Math.round(availableMinutes * 0.3),
        minigameMinutes: Math.round(availableMinutes * 0.2),
        challengeMinutes: 0
      };
    } else if (isLast7Days) {
      rationale = `Quedan ${daysRemaining} días. Modo Alta Presión: reducimos teoría y aumentamos resolución directa de ejercicios de ${targetUnit.title}.`;
    } else {
      rationale = `Te quedan ${daysRemaining} días. Tu mayor debilidad actual es ${targetUnit.title} (${targetMastery}%). Una sesión enfocada aumentará tu probabilidad de aprobación.`;
    }

    return {
      urgencyLevel: urgency,
      suggestedDurationMinutes: availableMinutes,
      targetUnitId: targetUnit.id,
      targetTopicTitle: targetUnit.title,
      rationale,
      breakdown,
      exerciseIds,
      formulaIds
    };
  }
}
