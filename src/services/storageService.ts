import { 
  UserProfile, 
  UnitMastery, 
  ExerciseAttempt, 
  MistakeRecord, 
  SpacedCardReview, 
  ExamSimulationResult, 
  Achievement,
  UnitId
} from '../types/domain';
import { CURRICULA_UNITS } from '../data/curriculaData';
import { FORMULA_CARDS } from '../data/formulasData';
import { SpacedRepetitionEngine } from './spacedRepetitionEngine';
import { ExamSession } from './randomEngine';

export interface ActiveExamData {
  session: ExamSession;
  answers: Record<string, string>;
  timeLeft: number;
  currentIndex: number;
  examStarted: boolean;
}

const STORAGE_KEYS = {
  USER_PROFILE: 'unne_cdi_user_profile',
  UNIT_MASTERIES: 'unne_cdi_unit_masteries',
  ATTEMPTS: 'unne_cdi_attempts',
  MISTAKES: 'unne_cdi_mistakes',
  SPACED_CARDS: 'unne_cdi_spaced_cards',
  EXAM_RESULTS: 'unne_cdi_exam_results',
  ACHIEVEMENTS: 'unne_cdi_achievements',
  ACTIVE_EXAM: 'unne_cdi_active_exam'
};

export class StorageService {
  public static getInitialUserProfile(): UserProfile {
    const defaultExamTimestamp = Date.now() + (21 * 24 * 60 * 60 * 1000); // 21 days from now
    return {
      id: 'student_unne_1',
      name: 'Estudiante LSI',
      examDateTimestamp: defaultExamTimestamp,
      availableHoursPerDay: 2,
      daysAvailablePerWeek: 6,
      worksOrStudies: true,
      confidenceLevel: 'medio',
      totalXp: 150,
      levelIndex: 1,
      levelTitle: 'Alumno en Nivelación',
      studyStreakDays: 1,
      lastStudyDate: new Date().toISOString().split('T')[0],
      soundEnabled: true,
      diagnosticCompleted: false,
      dailyGoalMinutes: 30,
      todayMinutesStudied: 0,
      estimatedExamPassRate: 15
    };
  }

  public static getInitialUnitMasteries(): Record<UnitId, UnitMastery> {
    const masteries = {} as Record<UnitId, UnitMastery>;
    CURRICULA_UNITS.forEach(unit => {
      masteries[unit.id] = {
        unitId: unit.id,
        unitName: unit.title,
        percentage: 0,
        conceptualMastery: 0,
        proceduralMastery: 0,
        formulaMastery: 0,
        totalAttempts: 0,
        correctAttempts: 0,
        priorityLevel: 'CRITICA'
      };
    });
    return masteries;
  }

  public static getInitialAchievements(): Achievement[] {
    return [
      { id: 'ach_1', title: 'Primera Sesión', description: 'Completaste tu primer bloque de entrenamiento.', iconName: 'Sparkles', unlocked: false, xpReward: 50 },
      { id: 'ach_2', title: '10 Aciertos Seguidos', description: 'Demostraste precisión matemática en 10 ejercicios consecutivos.', iconName: 'Flame', unlocked: false, xpReward: 150 },
      { id: 'ach_3', title: 'Maestro de Fórmulas', description: 'Dominaste 10 fórmulas en el sistema de recuperación activa.', iconName: 'BookOpen', unlocked: false, xpReward: 200 },
      { id: 'ach_4', title: 'Superaste tu Peor Tema', description: 'Elevaste el dominio de una unidad crítica por encima del 70%.', iconName: 'TrendingUp', unlocked: false, xpReward: 250 },
      { id: 'ach_5', title: 'Simulacro Aprobado', description: 'Superaste el 60% en un simulacro realista de Examen Libre.', iconName: 'Award', unlocked: false, xpReward: 300 },
      { id: 'ach_6', title: 'Velocidad Relámpago', description: 'Completaste una ronda de Formula Rush sin ningún error.', iconName: 'Zap', unlocked: false, xpReward: 100 }
    ];
  }

  public static loadUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : this.getInitialUserProfile();
    } catch {
      return this.getInitialUserProfile();
    }
  }

  public static saveUserProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Error saving user profile to localStorage', e);
    }
  }

  public static loadUnitMasteries(): Record<UnitId, UnitMastery> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.UNIT_MASTERIES);
      return data ? JSON.parse(data) : this.getInitialUnitMasteries();
    } catch {
      return this.getInitialUnitMasteries();
    }
  }

  public static saveUnitMasteries(masteries: Record<UnitId, UnitMastery>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.UNIT_MASTERIES, JSON.stringify(masteries));
    } catch (e) {
      console.error('Error saving unit masteries to localStorage', e);
    }
  }

  public static loadAttempts(): ExerciseAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveAttempts(attempts: ExerciseAttempt[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
    } catch (e) {
      console.error('Error saving attempts', e);
    }
  }

  public static loadMistakes(): MistakeRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MISTAKES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveMistakes(mistakes: MistakeRecord[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.MISTAKES, JSON.stringify(mistakes));
    } catch (e) {
      console.error('Error saving mistakes', e);
    }
  }

  public static loadSpacedCards(): Record<string, SpacedCardReview> {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SPACED_CARDS);
      if (data) return JSON.parse(data);

      // Initialize all formulas
      const initialCards: Record<string, SpacedCardReview> = {};
      FORMULA_CARDS.forEach(f => {
        initialCards[f.id] = SpacedRepetitionEngine.initCard(f.id);
      });
      return initialCards;
    } catch {
      const initialCards: Record<string, SpacedCardReview> = {};
      FORMULA_CARDS.forEach(f => {
        initialCards[f.id] = SpacedRepetitionEngine.initCard(f.id);
      });
      return initialCards;
    }
  }

  public static saveSpacedCards(cards: Record<string, SpacedCardReview>): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SPACED_CARDS, JSON.stringify(cards));
    } catch (e) {
      console.error('Error saving spaced cards', e);
    }
  }

  public static loadExamResults(): ExamSimulationResult[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXAM_RESULTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  public static saveExamResults(results: ExamSimulationResult[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAM_RESULTS, JSON.stringify(results));
    } catch (e) {
      console.error('Error saving exam results', e);
    }
  }

  public static loadAchievements(): Achievement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : this.getInitialAchievements();
    } catch {
      return this.getInitialAchievements();
    }
  }

  public static saveAchievements(achievements: Achievement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (e) {
      console.error('Error saving achievements', e);
    }
  }

  public static loadActiveExam(): ActiveExamData | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACTIVE_EXAM);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  public static saveActiveExam(data: ActiveExamData): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_EXAM, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving active exam', e);
    }
  }

  public static clearActiveExam(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_EXAM);
    } catch (e) {
      console.error('Error clearing active exam', e);
    }
  }

  public static resetProgress(): void {
    localStorage.clear();
  }
}
