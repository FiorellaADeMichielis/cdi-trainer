import React from 'react';
import { UnitId, UnitMastery } from '../../../types/domain';
import { CURRICULA_UNITS } from '../../../data/curriculaData';
import { IconArrowRight } from '../../icons';

interface SyllabusPresenterProps {
  unitMasteries: Record<UnitId, UnitMastery>;
  onTrainUnit: (unitId: UnitId) => void;
}

export const SyllabusPresenter: React.FC<SyllabusPresenterProps> = ({
  unitMasteries,
  onTrainUnit
}) => {
  const getUnitStatus = (mastery?: UnitMastery) => {
    if (!mastery || mastery.totalAttempts === 0) {
      return {
        label: 'Sin empezar',
        badgeClass: 'text-zinc-400 bg-zinc-800/80 border-zinc-700/60',
        barClass: 'fill-zinc-600',
        percent: 0
      };
    }
    const p = Math.round(mastery.percentage);
    if (p >= 80) {
      return {
        label: 'Repasado',
        badgeClass: 'text-emerald-400 bg-emerald-950/30 border-emerald-800/40',
        barClass: 'fill-emerald-500',
        percent: p
      };
    }
    if (p >= 60) {
      return {
        label: 'Bien',
        badgeClass: 'text-zinc-200 bg-zinc-800 border-zinc-700',
        barClass: 'fill-zinc-400',
        percent: p
      };
    }
    return {
      label: 'Para reforzar',
      badgeClass: 'text-amber-400 bg-amber-950/30 border-amber-800/40',
      barClass: 'fill-amber-500',
      percent: p
    };
  };

  return (
    <div className="space-y-6">
      {/* Encabezado sin encasillar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Programa de la materia
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-sans tracking-tight">
            Unidades de Cálculo Diferencial e Integral
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Las 10 unidades temáticas para el examen libre según el plan de estudio de la UNNE.
          </p>
        </div>
      </div>

      {/* Lista limpia de unidades (sin anidar tarjetas dentro de tarjetas) */}
      <div className="divide-y divide-zinc-800/80 rounded-2xl bg-[#14161a] border border-zinc-800 overflow-hidden">
        {CURRICULA_UNITS.map((unit) => {
          const mastery = unitMasteries[unit.id];
          const status = getUnitStatus(mastery);

          return (
            <div 
              key={unit.id}
              className="p-5 sm:p-6 hover:bg-zinc-800/30 transition-colors flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Información principal */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-amber-400 font-sans">
                    Unidad {unit.number}
                  </span>
                  <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${status.badgeClass}`}>
                    {status.label}
                  </span>
                </div>
                <h4 className="text-base font-bold text-zinc-100 tracking-tight font-sans">
                  {unit.title}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-1">
                  {unit.topics.map((t) => t.title).join(' • ')}
                </p>
              </div>

              {/* Progreso y acción */}
              <div className="flex items-center gap-6 shrink-0 pt-2 lg:pt-0">
                <div className="w-28 sm:w-36 space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-400 font-medium">
                    <span>Avance</span>
                    <span className="text-zinc-200">{status.percent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <svg className="w-full h-full" preserveAspectRatio="none">
                      <rect 
                        x="0" 
                        y="0" 
                        width={`${Math.min(100, Math.max(0, status.percent))}%`} 
                        height="100%" 
                        className={`${status.barClass} transition-all duration-500`}
                      />
                    </svg>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onTrainUnit(unit.id)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700/80 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Practicar</span>
                  <IconArrowRight className="size-3.5" />
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

