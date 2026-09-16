import React from 'react';
import { useTrainerState } from './hooks/useTrainerState';
import { EXERCISES_DATA } from './data/exercisesData';

// Presentational & Container Components (Smart - Dumb Architecture)
import { NavbarPresenter } from './components/presentational/NavbarPresenter';
import { DashboardContainer } from './components/containers/DashboardContainer';
import { StudySessionContainer } from './components/containers/StudySessionContainer';
import { FormulaVaultContainer } from './components/containers/FormulaVaultContainer';
import { MinigameArenaContainer } from './components/containers/MinigameArenaContainer';
import { ExamSimulatorContainer } from './components/containers/ExamSimulatorContainer';
import { DiagnosticModal } from './components/diagnostic/DiagnosticModal';

export const App: React.FC = () => {
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

  // Get active exercises for the study session based on unit selection or recommendation
  const getStudyExercises = () => {
    if (activeStudyUnitId) {
      const unitEx = EXERCISES_DATA.filter(e => e.unitId === activeStudyUnitId);
      return unitEx.length > 0 ? unitEx : EXERCISES_DATA;
    }
    const recommendedEx = EXERCISES_DATA.filter(e => recommendation.exerciseIds.includes(e.id));
    return recommendedEx.length > 0 ? recommendedEx : EXERCISES_DATA;
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-zinc-100 flex flex-col selection:bg-amber-600/30 selection:text-amber-200 pb-24 md:pb-0">
      
      {/* 1. Header and Ergonomic Navigation */}
      <NavbarPresenter
        userProfile={userProfile}
        activeTab={activeTab}
        daysRemaining={daysRemaining}
        onSelectTab={(tab) => {
          setActiveStudyUnitId(null);
          setActiveTab(tab);
        }}
        onToggleSound={handleToggleSound}
        onResetData={handleResetData}
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
              setActiveStudyUnitId(recommendation.targetUnitId);
              setActiveTab('study');
            }}
            onTrainUnit={(unitId) => {
              setActiveStudyUnitId(unitId);
              setActiveTab('study');
            }}
            onSelectTab={setActiveTab}
          />
        )}

        {/* --- TAB: ACTIVE STUDY SESSION --- */}
        {activeTab === 'study' && (
          <StudySessionContainer
            exercises={getStudyExercises()}
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

      {/* Adaptive Onboarding Diagnostic Modal */}
      <DiagnosticModal
        isOpen={!userProfile.diagnosticCompleted}
        onCompleteDiagnostic={handleCompleteDiagnostic}
      />

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0c0d10] py-8 text-center text-xs text-zinc-500 font-sans">
        <p>
          Cálculo Diferencial e Integral · Licenciatura en Sistemas de Información · FaCENA - UNNE
        </p>
      </footer>

    </div>
  );
};

export default App;
