import React from 'react';
import { StudyRecommendation } from '../../../types/domain';
import { IconArrowRight, IconBook, IconClock } from '../../icons';

interface NextStepPresenterProps {
  recommendation: StudyRecommendation;
  availableMinutes: number;
  onChangeMinutes: (min: number) => void;
  onStartSession: () => void;
}

const TIME_OPTIONS = [15, 25, 45];

export const NextStepPresenter: React.FC<NextStepPresenterProps> = ({
  recommendation,
  availableMinutes,
  onChangeMinutes,
  onStartSession
}) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#14161a] border border-zinc-800 space-y-6">
      
      {/* Encabezado directo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Próximo paso recomendado
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-sans tracking-tight">
            ¿Qué estudiar ahora?
          </h3>
        </div>
        <span className="text-xs font-medium text-zinc-400 self-start sm:self-auto bg-[#1a1c22] px-3 py-1 rounded-full border border-zinc-800">
          {recommendation.targetUnitId}
        </span>
      </div>

      {/* Contenido de la recomendación */}
      <div className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800/80 space-y-3">
        <div className="flex items-start gap-3.5">
          <div className="size-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
            <IconBook className="size-5 text-amber-400" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-zinc-100 font-sans">
              {recommendation.targetTopicTitle}
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 leading-relaxed">
              {recommendation.rationale}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
          <span>Ejercicios preparados:</span>
          <span className="text-zinc-200 font-medium">
            {recommendation.exerciseIds.length} problemas prácticos
          </span>
        </div>
      </div>

      {/* Tiempo disponible y acción */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="space-y-2">
          <label className="text-xs text-zinc-400 font-medium flex items-center gap-1.5">
            <IconClock className="size-3.5 text-zinc-500" />
            <span>Tiempo disponible para hoy:</span>
          </label>
          <div className="flex items-center gap-2">
            {TIME_OPTIONS.map((min) => (
              <button
                key={min}
                type="button"
                onClick={() => onChangeMinutes(min)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  availableMinutes === min
                    ? 'bg-zinc-800 text-amber-400 border-zinc-700 font-semibold'
                    : 'bg-[#181a20] text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onStartSession}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
        >
          <span>Continuar estudiando ({availableMinutes} min)</span>
          <IconArrowRight className="size-4 shrink-0" />
        </button>
      </div>

    </div>
  );
};

