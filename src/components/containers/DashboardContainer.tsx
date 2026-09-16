import React from 'react';
import { UserProfile, UnitMastery, UnitId, StudyRecommendation, MistakeRecord, ExamSimulationResult } from '../../types/domain';
import { DashboardSummaryPresenter } from '../presentational/dashboard/DashboardSummaryPresenter';
import { NextStepPresenter } from '../presentational/dashboard/NextStepPresenter';
import { WeaknessesPresenter, CriticalWeakness } from '../presentational/dashboard/WeaknessesPresenter';
import { SyllabusPresenter } from '../presentational/dashboard/SyllabusPresenter';
import { QuickPracticePresenter } from '../presentational/dashboard/QuickPracticePresenter';
import { NavigationTab } from '../../hooks/useTrainerState';

interface DashboardContainerProps {
  userProfile: UserProfile;
  passRate: number;
  daysRemaining: number;
  recommendation: StudyRecommendation;
  availableMinutes: number;
  criticalWeaknesses: CriticalWeakness[];
  mistakes: MistakeRecord[];
  unitMasteries: Record<UnitId, UnitMastery>;
  attemptsCount?: number;
  examResults?: ExamSimulationResult[];
  onChangeMinutes: (min: number) => void;
  onStartSession: () => void;
  onTrainUnit: (unitId: UnitId) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  userProfile: _userProfile,
  daysRemaining,
  recommendation,
  availableMinutes,
  criticalWeaknesses,
  mistakes,
  unitMasteries,
  attemptsCount = 0,
  examResults = [],
  onChangeMinutes,
  onStartSession,
  onTrainUnit,
  onSelectTab
}) => {
  // Count units with passing mark or real review
  const reviewedUnitsCount = Object.values(unitMasteries).filter(
    (u) => u.totalAttempts > 0 && u.percentage >= 60
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fadeIn">
      
      {/* 1. RESUMEN: ¿Cómo vengo? */}
      <section aria-labelledby="summary-title">
        <DashboardSummaryPresenter
          daysRemaining={daysRemaining}
          reviewedUnitsCount={reviewedUnitsCount}
          totalUnitsCount={10}
          exercisesCompletedCount={attemptsCount}
          examResults={examResults}
        />
      </section>

      {/* 2. PRÓXIMO PASO: ¿Qué estudiar ahora? */}
      <section aria-labelledby="next-step-title">
        <NextStepPresenter
          recommendation={recommendation}
          availableMinutes={availableMinutes}
          onChangeMinutes={onChangeMinutes}
          onStartSession={onStartSession}
        />
      </section>

      {/* 3. TEMAS PARA REFORZAR: ¿Qué temas tengo más flojos? */}
      <section aria-labelledby="weaknesses-title">
        <WeaknessesPresenter
          weaknesses={criticalWeaknesses}
          mistakes={mistakes}
          onTrainUnit={onTrainUnit}
        />
      </section>

      {/* 4. TEMAS: Lista de unidades del programa */}
      <section aria-labelledby="syllabus-title">
        <SyllabusPresenter
          unitMasteries={unitMasteries}
          onTrainUnit={onTrainUnit}
        />
      </section>

      {/* 5. PRÁCTICA: Fórmulas, ejercicios interactivos y simulacros */}
      <section aria-labelledby="practice-title">
        <QuickPracticePresenter
          onSelectTab={onSelectTab}
        />
      </section>

    </div>
  );
};
