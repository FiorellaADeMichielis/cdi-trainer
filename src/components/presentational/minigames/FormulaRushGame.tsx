import React from 'react';
import { FORMULA_RUSH_QUESTIONS } from '../../../data/minigamesData';
import { MathView } from '../../common/MathView';
import { IconClock, IconTrophy, IconArrowLeft } from '../../icons';

interface FormulaRushGameProps {
  rushIndex: number;
  rushTimeLeft: number;
  currentScore: number;
  gameOver: boolean;
  onAnswer: (isCorrect: boolean) => void;
  onRestart: () => void;
  onBackToHub: () => void;
}

export const FormulaRushGame: React.FC<FormulaRushGameProps> = ({
  rushIndex,
  rushTimeLeft,
  currentScore,
  gameOver,
  onAnswer,
  onRestart,
  onBackToHub
}) => {
  const currentQ = FORMULA_RUSH_QUESTIONS[rushIndex] || FORMULA_RUSH_QUESTIONS[0];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn">
      {/* Top back control */}
      <button
        type="button"
        onClick={onBackToHub}
        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-mono"
      >
        <IconArrowLeft className="size-4" />
        <span>Volver al Laboratorio</span>
      </button>

      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8">
        {!gameOver ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">
                Pregunta {rushIndex + 1} de {FORMULA_RUSH_QUESTIONS.length}
              </span>
              <div className="flex items-center gap-2.5">
                <div className={`font-mono font-black text-xs sm:text-sm px-3 py-1.5 rounded-lg border flex items-center gap-1.5 ${
                  rushTimeLeft <= 3 ? 'bg-rose-950/60 border-rose-800 text-rose-300 animate-bounce' : 'bg-[#1a1c22] border-zinc-800 text-zinc-300'
                }`}>
                  <IconClock className="size-3.5 text-amber-400" />
                  <span>{rushTimeLeft}s</span>
                </div>
                <span className="text-xs font-bold text-zinc-300 bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700">
                  {currentScore} pts
                </span>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-[#1a1c22] border border-zinc-800 text-center">
              <p className="text-sm sm:text-base font-semibold text-zinc-200 leading-relaxed font-sans">
                {currentQ.situationText}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.formulaOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onAnswer(opt.isCorrect)}
                  className="p-5 rounded-xl bg-[#1a1c22] hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/60 transition-all text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[52px]"
                >
                  <div className="text-xs font-bold text-zinc-400 group-hover:text-amber-300 mb-1.5 font-mono">
                    {opt.name}
                  </div>
                  <MathView math={opt.latex} block />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 space-y-5 animate-fadeIn">
            <IconTrophy className="size-16 text-amber-400 mx-auto" />
            <h3 className="text-2xl font-bold text-zinc-100 font-sans">¡Actividad completada!</h3>
            <p className="text-sm text-zinc-300 font-sans">
              Puntaje total obtenido: <strong className="text-amber-400 font-bold">{currentScore} puntos</strong>
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={onRestart}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm transition-colors shadow-sm cursor-pointer"
              >
                Practicar de nuevo
              </button>
              <button
                type="button"
                onClick={onBackToHub}
                className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs font-mono border border-zinc-700 transition-colors"
              >
                Volver a Estaciones
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
