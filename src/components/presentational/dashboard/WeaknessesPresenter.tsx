import React from 'react';
import { MistakeRecord, UnitId } from '../../../types/domain';
import { IconArrowRight, IconShieldCheck } from '../../icons';

export interface CriticalWeakness {
  unitId: UnitId;
  unitTitle: string;
  percentage: number;
  rationale: string;
}

interface WeaknessesPresenterProps {
  weaknesses: CriticalWeakness[];
  mistakes: MistakeRecord[];
  onTrainUnit: (unitId: UnitId) => void;
}

export const WeaknessesPresenter: React.FC<WeaknessesPresenterProps> = ({
  weaknesses,
  mistakes,
  onTrainUnit
}) => {
  const sortedMistakes = [...mistakes].sort((a, b) => b.frequency - a.frequency).slice(0, 3);
  const hasItemsToReinforce = weaknesses.length > 0 || sortedMistakes.length > 0;

  if (!hasItemsToReinforce) {
    return (
      <div className="p-6 rounded-2xl bg-[#14161a] border border-zinc-800 flex items-center gap-4">
        <div className="size-10 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-400 flex items-center justify-center shrink-0">
          <IconShieldCheck className="size-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-200">
            Sin errores recurrentes registrados
          </h4>
          <p className="text-xs text-zinc-400 mt-0.5">
            Venís respondiendo bien a los ejercicios resueltos. Podés continuar con el programa o probar un simulacro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#14161a] border border-zinc-800 space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-400 font-sans">
          Para reforzar
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1 font-sans tracking-tight">
          ¿Qué temas conviene repasar?
        </h3>
        <p className="text-sm text-zinc-400 mt-1">
          Detectamos estos puntos donde tuviste dudas o errores en los últimos ejercicios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Unidades que necesitan refuerzo */}
        {weaknesses.slice(0, 2).map((w) => (
          <div 
            key={w.unitId} 
            className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-400">{w.unitId}</span>
                <span className="text-rose-400 font-medium">Necesita práctica</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-zinc-100 mt-1.5">
                {w.unitTitle}
              </h4>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                {w.rationale}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onTrainUnit(w.unitId)}
              className="w-full sm:w-auto self-start px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700"
            >
              <span>Repasar tema</span>
              <IconArrowRight className="size-3.5" />
            </button>
          </div>
        ))}

        {/* Errores frecuentes específicos */}
        {sortedMistakes.map((m) => (
          <div 
            key={m.mistakeKey} 
            className="p-5 rounded-xl bg-[#1a1c22] border border-zinc-800 flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-400">{m.unitId}</span>
                <span className="text-zinc-500 font-medium">{m.frequency} {m.frequency === 1 ? 'duda' : 'dudas'}</span>
              </div>
              <h4 className="text-sm font-semibold text-zinc-200 mt-1.5">
                {m.description}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => onTrainUnit(m.unitId)}
              className="w-full sm:w-auto self-start px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-zinc-700"
            >
              <span>Ejercitar este error</span>
              <IconArrowRight className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
