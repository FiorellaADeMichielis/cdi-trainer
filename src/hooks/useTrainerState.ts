import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  UserProfile, 
  UnitMastery, 
  ExerciseAttempt, 
  MistakeRecord, 
  SpacedCardReview, 
  ExamSimulationResult, 
  UnitId,
  StudyRecommendation
} from '../types/domain';
import { StorageService } from '../services/storageService';
import { MasteryEngine } from '../services/masteryEngine';
import { RecommendationEngine } from '../services/recommendationEngine';
import { SpacedRepetitionEngine } from '../services/spacedRepetitionEngine';
import { soundService } from '../services/soundService';

export type NavigationTab = 'dashboard' | 'study' | 'formulas' | 'minigames' | 'exam';

export const useTrainerState = () => {
  // Persistent data states
  const [userProfile, setUserProfile] = useState<UserProfile>(() => StorageService.loadUserProfile());
  const [unitMasteries, setUnitMasteries] = useState<Record<UnitId, UnitMastery>>(() => StorageService.loadUnitMasteries());
  const [attempts, setAttempts] = useState<ExerciseAttempt[]>(() => StorageService.loadAttempts());
  const [mistakes, setMistakes] = useState<MistakeRecord[]>(() => StorageService.loadMistakes());
  const [spacedCards, setSpacedCards] = useState<Record<string, SpacedCardReview>>(() => StorageService.loadSpacedCards());
  const [examResults, setExamResults] = useState<ExamSimulationResult[]>(() => StorageService.loadExamResults());

  // UI / Navigation states
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [availableMinutes, setAvailableMinutes] = useState<number>(25);
  const [activeStudyUnitId, setActiveStudyUnitId] = useState<UnitId | null>(null);

  // Sync sound setting with SoundService
  useEffect(() => {
    soundService.setEnabled(userProfile.soundEnabled);
  }, [userProfile.soundEnabled]);

  // Derived readiness score (0 - 100%) and university grade (0.0 - 10.0)
  const passRate = useMemo(() => {
    return MasteryEngine.calculateOverallReadiness(
      unitMasteries,
      attempts,
      examResults.map(r => r.totalScore)
    );
  }, [unitMasteries, attempts, examResults]);

  const daysRemaining = useMemo(() => {
    return Math.max(0, Math.ceil((userProfile.examDateTimestamp - Date.now()) / (1000 * 60 * 60 * 24)));
  }, [userProfile.examDateTimestamp]);

  // Dynamic daily recommendation
  const recommendation: StudyRecommendation = useMemo(() => {
    return RecommendationEngine.recommendSession(
      daysRemaining,
      availableMinutes,
      unitMasteries,
      mistakes
    );
  }, [daysRemaining, availableMinutes, unitMasteries, mistakes]);

  // Critical weaknesses detected in the student profile
  const criticalWeaknesses = useMemo(() => {
    return MasteryEngine.detectCriticalWeaknesses(unitMasteries, mistakes);
  }, [unitMasteries, mistakes]);

  // Actions
  const handleToggleSound = useCallback(() => {
    const updated = !userProfile.soundEnabled;
    const newProfile = { ...userProfile, soundEnabled: updated };
    setUserProfile(newProfile);
    StorageService.saveUserProfile(newProfile);
    soundService.setEnabled(updated);
  }, [userProfile]);

  const handleResetData = useCallback(() => {
    if (window.confirm('¿Estás seguro de que querés reiniciar todo tu progreso de estudio?')) {
      StorageService.resetProgress();
      setUserProfile(StorageService.getInitialUserProfile());
      setUnitMasteries(StorageService.getInitialUnitMasteries());
      setAttempts([]);
      setMistakes([]);
      setSpacedCards(StorageService.loadSpacedCards());
      setExamResults([]);
      setActiveTab('dashboard');
    }
  }, []);

  const handleEarnXp = useCallback((xp: number) => {
    setUserProfile(prevProfile => {
      const newXp = prevProfile.totalXp + xp;
      let newLevel = prevProfile.levelIndex;
      let levelTitle = prevProfile.levelTitle;

      if (newXp >= 1000) { newLevel = 6; levelTitle = 'Aprobado con Distinción'; }
      else if (newXp >= 650) { newLevel = 5; levelTitle = 'Candidato a Libre'; }
      else if (newXp >= 400) { newLevel = 4; levelTitle = 'Resolutor de TP'; }
      else if (newXp >= 250) { newLevel = 3; levelTitle = 'Alumno Regular Activo'; }
      else if (newXp >= 120) { newLevel = 2; levelTitle = 'Estudiante en Ejercitación'; }

      const updatedProfile = {
        ...prevProfile,
        totalXp: newXp,
        levelIndex: newLevel,
        levelTitle
      };

      StorageService.saveUserProfile(updatedProfile);
      return updatedProfile;
    });
  }, []);

  const handleRecordAttempt = useCallback((attempt: ExerciseAttempt, mistake?: MistakeRecord) => {
    // 1. Update attempts
    setAttempts(prev => {
      const updated = [...prev, attempt];
      StorageService.saveAttempts(updated);
      return updated;
    });

    // 2. Update unit mastery
    setUnitMasteries(prevMasteries => {
      const currentUnitMastery = prevMasteries[attempt.unitId];
      if (!currentUnitMastery) return prevMasteries;
      const updatedUnitMastery = MasteryEngine.updateUnitMastery(currentUnitMastery, attempt);
      const newMasteries = { ...prevMasteries, [attempt.unitId]: updatedUnitMastery };
      StorageService.saveUnitMasteries(newMasteries);
      return newMasteries;
    });

    // 3. Update mistakes
    if (mistake) {
      setMistakes(prevMistakes => {
        const existingIdx = prevMistakes.findIndex(m => m.mistakeKey === mistake.mistakeKey);
        let updatedMistakes = [...prevMistakes];
        if (existingIdx >= 0) {
          updatedMistakes[existingIdx] = {
            ...updatedMistakes[existingIdx],
            frequency: updatedMistakes[existingIdx].frequency + 1,
            lastOccurredAt: Date.now()
          };
        } else {
          updatedMistakes.push(mistake);
        }
        StorageService.saveMistakes(updatedMistakes);
        return updatedMistakes;
      });
    }

    // 4. Earn base PMA on correct answer
    if (attempt.isCorrect) {
      handleEarnXp(25);
    }
  }, [handleEarnXp]);

  const handleReviewFormula = useCallback((formulaId: string, quality: 0 | 1 | 3 | 5) => {
    setSpacedCards(prevCards => {
      const card = prevCards[formulaId] || SpacedRepetitionEngine.initCard(formulaId);
      const updated = SpacedRepetitionEngine.reviewCard(card, quality);
      const newCards = { ...prevCards, [formulaId]: updated };
      StorageService.saveSpacedCards(newCards);
      return newCards;
    });

    if (quality >= 3) {
      handleEarnXp(15);
    }
  }, [handleEarnXp]);

  const handleRecordExamResult = useCallback((result: ExamSimulationResult) => {
    setExamResults(prevResults => {
      const updated = [result, ...prevResults];
      StorageService.saveExamResults(updated);
      return updated;
    });
    handleEarnXp(result.totalScore * 2);
  }, [handleEarnXp]);

  const handleCompleteDiagnostic = useCallback((computedMasteries: Record<UnitId, UnitMastery>) => {
    setUnitMasteries(computedMasteries);
    StorageService.saveUnitMasteries(computedMasteries);

    setUserProfile(prevProfile => {
      const updatedProfile: UserProfile = {
        ...prevProfile,
        diagnosticCompleted: true,
        totalXp: prevProfile.totalXp + 100
      };
      StorageService.saveUserProfile(updatedProfile);
      return updatedProfile;
    });
  }, []);

  return {
    userProfile,
    unitMasteries,
    attempts,
    mistakes,
    spacedCards,
    examResults,
    activeTab,
    availableMinutes,
    activeStudyUnitId,
    passRate,
    daysRemaining,
    recommendation,
    criticalWeaknesses,
    setActiveTab,
    setAvailableMinutes,
    setActiveStudyUnitId,
    handleToggleSound,
    handleResetData,
    handleEarnXp,
    handleRecordAttempt,
    handleReviewFormula,
    handleRecordExamResult,
    handleCompleteDiagnostic
  };
};

