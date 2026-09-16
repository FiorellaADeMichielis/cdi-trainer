import React from 'react';
import { IconClock, IconArrowLeft } from '../../icons';

interface ClockBattleGameProps {
  onComplete: () => void;
  onBackToHub: () => void;
}

export const ClockBattleGame: React.FC<ClockBattleGameProps> = ({
  onComplete,
  onBackToHub
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      <button
        type="button"
        onClick={onBackToHub}
        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-mono"
      >
        <IconArrowLeft className="size-4" />
        <span>Volver al Laboratorio</span>
      </button>

      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8 text-center">
        <div className="size-16 rounded-full bg-amber-950/40 border border-amber-800/60 flex items-center justify-center mx-auto text-amber-400">
          <IconClock className="size-8 text-amber-400" />
        </div>

        <div>
          <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Simulador de Presión Temporal
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-academic mt-1">
            Desafío Contra el Reloj
          </h3>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto mt-2 leading-relaxed font-sans">
            10 ejercicios escalonados en dificultad. Dispones de 60 segundos base con +10 segundos adicionales por acierto analítico.
          </p>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-md"
        >
          Completar desafío con tiempo
        </button>
      </div>
    </div>
  );
};
