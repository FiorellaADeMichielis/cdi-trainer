import React from 'react';
import { IconCalendar, IconCheck, IconAward } from '../../icons';
import { ExamSimulationResult } from '../../../types/domain';

interface DashboardSummaryPresenterProps {
  daysRemaining: number;
  reviewedUnitsCount: number;
  totalUnitsCount: number;
  exercisesCompletedCount: number;
  examResults: ExamSimulationResult[];
}

export const DashboardSummaryPresenter: React.FC<DashboardSummaryPresenterProps> = ({
  daysRemaining,
  reviewedUnitsCount,
  totalUnitsCount,
  exercisesCompletedCount,
  examResults
}) => {
  const lastExam = examResults.length > 0 ? examResults[examResults.length - 1] : null;
  const progressPercent = Math.round((reviewedUnitsCount / totalUnitsCount) * 100);

  return (
    <div className="space-y-6">
      {/* Saludo y contexto */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
          Preparación para el examen libre
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100 mt-1 font-sans tracking-tight">
          ¿Cómo venís con el estudio?
        </h2>
        <p className="text-sm text-zinc-400 mt-1.5 max-w-2xl leading-relaxed">
          Seguimiento de tu avance sobre el programa oficial de Cálculo Diferencial e Integral de la UNNE.
        </p>
      </div>

      {/* Grid de métricas reales (respirando sobre fondo, con bordes sutiles) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Días restantes */}
        <div className="p-5 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Tiempo hasta la mesa</span>
            <IconCalendar className="size-4 text-zinc-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
              {daysRemaining} {daysRemaining === 1 ? 'día' : 'días'}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {daysRemaining <= 7 ? 'Queda poco tiempo para el examen' : 'Tiempo suficiente para repasar con constancia'}
            </p>
          </div>
        </div>

        {/* Unidades repasadas */}
        <div className="p-5 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Programa repasado</span>
            <span className="text-amber-400 font-semibold text-xs">{progressPercent}%</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
              {reviewedUnitsCount} de {totalUnitsCount}
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <rect 
                  x="0" 
                  y="0" 
                  width={`${Math.min(100, Math.max(0, progressPercent))}%`} 
                  height="100%" 
                  className="fill-amber-400 transition-all duration-500"
                />
              </svg>
            </div>
            <p className="text-xs text-zinc-400">
              {reviewedUnitsCount === 0 ? 'Empezá repasando la Unidad 1' : `${totalUnitsCount - reviewedUnitsCount} unidades pendientes`}
            </p>
          </div>
        </div>

        {/* Ejercicios resueltos */}
        <div className="p-5 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Ejercicios practicados</span>
            <IconCheck className="size-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
              {exercisesCompletedCount}
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              {exercisesCompletedCount > 0 ? 'Problemas de cátedra resueltos' : 'Aún no resolviste ejercicios'}
            </p>
          </div>
        </div>

        {/* Último simulacro */}
        <div className="p-5 rounded-2xl bg-[#14161a] border border-zinc-800 flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-400 text-xs font-medium">
            <span>Simulacros de examen</span>
            <IconAward className="size-4 text-zinc-500" />
          </div>
          <div className="mt-3">
            {lastExam ? (
              <>
                <div className="text-2xl sm:text-3xl font-bold text-zinc-100 font-sans">
                  {(lastExam.totalScore / 10).toFixed(1)} <span className="text-sm font-normal text-zinc-500">/ 10</span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  {lastExam.totalScore >= 60 ? 'Aprobado en tu último intento' : 'Necesita un poco más de práctica'}
                </p>
              </>
            ) : (
              <>
                <div className="text-sm font-medium text-zinc-400 mt-1">
                  Sin simulacros
                </div>
                <p className="text-xs text-zinc-500 mt-1">
                  Hacé un simulacro cuando quieras medir tu tiempo
                </p>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
