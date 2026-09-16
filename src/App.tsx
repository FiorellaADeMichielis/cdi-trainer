import React, { useState } from 'react';
import { useTrainerState } from './hooks/useTrainerState';
import { EXERCISES_DATA } from './data/exercisesData';

import { Exercise, UnitId } from './types/domain';
import { generateStudySession } from './services/randomEngine';

// Presentational & Container Components (Smart - Dumb Architecture)
import { NavbarPresenter } from './components/presentational/NavbarPresenter';
import { DashboardContainer } from './components/containers/DashboardContainer';
import { StudySessionContainer } from './components/containers/StudySessionContainer';
import { FormulaVaultContainer } from './components/containers/FormulaVaultContainer';
import { MinigameArenaContainer } from './components/containers/MinigameArenaContainer';
import { ExamSimulatorContainer } from './components/containers/ExamSimulatorContainer';
import { DiagnosticModal } from './components/diagnostic/DiagnosticModal';

export const App: React.FC = () => {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const [studyExercises, setStudyExercises] = useState<Exercise[]>(() => []);
  const [studySessionKey, setStudySessionKey] = useState<number>(0);

  const {
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
  } = useTrainerState();

  // Generates and sets a fresh randomized study session with shuffled options
  const startStudySession = (unitId?: UnitId | null) => {
    const targetUnit = unitId !== undefined ? unitId : (activeStudyUnitId || recommendation.targetUnitId);
    if (targetUnit) {
      setActiveStudyUnitId(targetUnit);
    }
    const count = Math.max(3, Math.min(8, Math.round(availableMinutes / 3)));
    const recentExerciseIds = attempts.slice(-10).map(a => a.exerciseId);
    const session = generateStudySession({
      pool: EXERCISES_DATA,
      unitId: targetUnit || undefined,
      count,
      excludeIds: recentExerciseIds
    });
    setStudyExercises(session);
    setStudySessionKey(prev => prev + 1);
    setActiveTab('study');
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 flex flex-col selection:bg-amber-600/30 selection:text-amber-200 pb-24 md:pb-0">
      
      {/* 1. Header and Ergonomic Navigation */}
      <NavbarPresenter
        userProfile={userProfile}
        activeTab={activeTab}
        daysRemaining={daysRemaining}
        onSelectTab={(tab) => {
          if (tab === 'study') {
            startStudySession(activeStudyUnitId);
          } else {
            setActiveStudyUnitId(null);
            setActiveTab(tab);
          }
        }}
        onToggleSound={handleToggleSound}
        onResetData={handleResetData}
        onOpenWelcome={() => setIsWelcomeModalOpen(true)}
      />

      {/* 2. Main Workstation Area */}
      <main className="flex-1">
        
        {/* --- TAB: DASHBOARD / INICIO --- */}
        {activeTab === 'dashboard' && (
          <DashboardContainer
            userProfile={userProfile}
            passRate={passRate}
            daysRemaining={daysRemaining}
            recommendation={recommendation}
            availableMinutes={availableMinutes}
            criticalWeaknesses={criticalWeaknesses}
            mistakes={mistakes}
            unitMasteries={unitMasteries}
            attemptsCount={attempts.length}
            examResults={examResults}
            onChangeMinutes={setAvailableMinutes}
            onStartSession={() => {
              startStudySession(recommendation.targetUnitId);
            }}
            onTrainUnit={(unitId) => {
              startStudySession(unitId);
            }}
            onSelectTab={setActiveTab}
          />
        )}

        {/* --- TAB: ACTIVE STUDY SESSION --- */}
        {activeTab === 'study' && (
          <StudySessionContainer
            key={studySessionKey}
            exercises={studyExercises.length > 0 ? studyExercises : generateStudySession({ pool: EXERCISES_DATA, unitId: activeStudyUnitId || undefined, count: 5 })}
            targetTopicTitle={activeStudyUnitId ? `Unidad ${activeStudyUnitId}` : recommendation.targetTopicTitle}
            durationMinutes={availableMinutes}
            onRecordAttempt={handleRecordAttempt}
            onFinishSession={() => setActiveTab('dashboard')}
          />
        )}

        {/* --- TAB: FORMULAS VAULT & EVOCATION --- */}
        {activeTab === 'formulas' && (
          <FormulaVaultContainer
            spacedCards={spacedCards}
            onReviewFormula={handleReviewFormula}
          />
        )}

        {/* --- TAB: COGNITIVE MINIGAMES LABORATORY --- */}
        {activeTab === 'minigames' && (
          <MinigameArenaContainer
            onEarnXp={handleEarnXp}
          />
        )}

        {/* --- TAB: REGULATION EXAM TRIBUNAL --- */}
        {activeTab === 'exam' && (
          <ExamSimulatorContainer
            onRecordExamResult={handleRecordExamResult}
            onFinishExam={() => setActiveTab('dashboard')}
          />
        )}

      </main>

      {/* Adaptive Onboarding Welcome & Diagnostic Modal */}
      <DiagnosticModal
        isOpen={!userProfile.diagnosticCompleted || isWelcomeModalOpen}
        onCompleteDiagnostic={(computedMasteries) => {
          handleCompleteDiagnostic(computedMasteries);
          setIsWelcomeModalOpen(false);
        }}
        onClose={() => setIsWelcomeModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0c0d10] py-8 text-center text-xs text-zinc-500 font-sans space-y-2">
        <p>
          Cálculo Diferencial e Integral · Licenciatura en Sistemas de Información · FaCENA - UNNE
        </p>
        <button
          type="button"
          onClick={() => setIsWelcomeModalOpen(true)}
          className="text-[11px] text-zinc-400 hover:text-amber-400 transition-colors underline underline-offset-4 cursor-pointer block mx-auto"
        >
          ¿Por qué existe esta app? / Ver guía y calibración inicial
        </button>
      </footer>

    </div>
  );
};

export default App;
