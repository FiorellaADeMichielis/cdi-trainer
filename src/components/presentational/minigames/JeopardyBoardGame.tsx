import React from 'react';
import { JEOPARDY_QUESTIONS, JeopardyQuestion } from '../../../data/minigamesData';
import { MathView } from '../../common/MathView';
import { IconArrowLeft, IconCheck, IconClose } from '../../icons';

interface JeopardyBoardGameProps {
  currentScore: number;
  selectedQ: JeopardyQuestion | null;
  answeredIds: string[];
  feedback: string | null;
  onSelectQ: (q: JeopardyQuestion) => void;
  onAnswerQ: (optionId: string, isCorrect: boolean) => void;
  onCloseQ: () => void;
  onBackToHub: () => void;
}

export const JeopardyBoardGame: React.FC<JeopardyBoardGameProps> = ({
  currentScore,
  selectedQ,
  answeredIds,
  feedback,
  onSelectQ,
  onAnswerQ,
  onCloseQ,
  onBackToHub
}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <button
        type="button"
        onClick={onBackToHub}
        className="flex items-center gap-2 text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-mono"
      >
        <IconArrowLeft className="size-4" />
        <span>Volver a Práctica</span>
      </button>

      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <span className="text-xs font-semibold text-amber-400">
            Cálculo Diferencial e Integral · UNNE
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-100 font-sans">
            Preguntas de examen por categoría
          </h3>
        </div>
        <div className="px-3.5 py-1.5 rounded-xl bg-[#14161a] border border-zinc-800 font-bold text-zinc-200 text-sm">
          {currentScore} pts
        </div>
      </div>

      {/* Jeopardy Grid Board */}
      {!selectedQ ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {JEOPARDY_QUESTIONS.map((q) => {
            const isAnswered = answeredIds.includes(q.id);
            return (
              <button
                key={q.id}
                type="button"
                disabled={isAnswered}
                onClick={() => onSelectQ(q)}
                className={`p-5 rounded-xl border text-center transition-all min-h-[96px] flex flex-col items-center justify-center ${
                  isAnswered
                    ? 'bg-[#14161a]/40 border-zinc-850 text-zinc-600 cursor-not-allowed'
                    : 'bg-[#14161a] hover:bg-zinc-800 border-zinc-800 hover:border-amber-500/60 text-zinc-200 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500'
                }`}
              >
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                  {q.category}
                </span>
                <span className={`text-lg font-bold mt-1 ${isAnswered ? 'text-zinc-600' : 'text-amber-400'}`}>
                  {isAnswered ? 'Resuelto' : `${q.points}`}
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8 animate-fadeIn">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400">
              {selectedQ.category} · {selectedQ.points} pts
            </span>
            <button
              type="button"
              onClick={onCloseQ}
              className="text-xs text-zinc-400 hover:text-zinc-100 font-mono"
            >
              Cerrar
            </button>
          </div>

          <div className="p-6 rounded-xl bg-[#1a1c22] border border-zinc-800 text-center space-y-3">
            <div className="py-2 overflow-x-auto">
              <MathView math={selectedQ.questionLatex} block />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {selectedQ.options.map((opt, optIdx) => {
              const optionLetter = ['A', 'B', 'C', 'D', 'E'][optIdx] || String.fromCharCode(65 + optIdx);
              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={feedback !== null}
                  onClick={() => onAnswerQ(opt.id, opt.isCorrect)}
                  className="p-4 sm:p-5 rounded-xl bg-[#1a1c22] hover:bg-zinc-800 border border-zinc-800 hover:border-amber-500/60 text-left text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex items-center gap-3 group"
                >
                  <span className="size-7 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 bg-zinc-800 text-zinc-400 border border-zinc-700/60 group-hover:text-amber-300 group-hover:border-amber-500/40 transition-colors">
                    {optionLetter}
                  </span>
                  <div className="flex-1 text-center">
                    <MathView math={opt.textLatex} />
                  </div>
                </button>
              );
            })}
          </div>

          {feedback && (
            <div className={`p-5 rounded-xl border text-xs sm:text-sm ${
              feedback.startsWith('¡Correcto')
                ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/80 text-rose-200'
            }`}>
              <div className="flex items-center gap-2.5 font-bold font-mono">
                {feedback.startsWith('¡Correcto') ? <IconCheck className="size-5 text-emerald-400" /> : <IconClose className="size-5 text-rose-400" />}
                <span>{feedback.startsWith('¡Correcto') ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}</span>
              </div>
              <p className="mt-2 text-xs text-zinc-300 font-sans leading-relaxed">
                {feedback}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onCloseQ}
                  className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold border border-zinc-700 transition-colors"
                >
                  Volver al Tablero
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
