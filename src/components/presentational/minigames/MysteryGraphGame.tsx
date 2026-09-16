import React from 'react';
import { MYSTERY_GRAPH_QUESTIONS, MysteryGraphQuestion } from '../../../data/minigamesData';
import { IconArrowRight, IconArrowLeft } from '../../icons';

interface MysteryGraphGameProps {
  mysteryIndex: number;
  selectedMysteryOption: string | null;
  currentQuestion?: MysteryGraphQuestion;
  totalQuestions?: number;
  onSelectOption: (optionId: string, isCorrect: boolean) => void;
  onNext: () => void;
  onBackToHub: () => void;
}

export const MysteryGraphGame: React.FC<MysteryGraphGameProps> = ({
  mysteryIndex,
  selectedMysteryOption,
  currentQuestion,
  totalQuestions,
  onSelectOption,
  onNext,
  onBackToHub
}) => {
  const currentQ = currentQuestion || MYSTERY_GRAPH_QUESTIONS[mysteryIndex] || MYSTERY_GRAPH_QUESTIONS[0];
  const total = totalQuestions ?? MYSTERY_GRAPH_QUESTIONS.length;

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

      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-mono font-bold text-amber-400">
            Geometría y Visualización ({mysteryIndex + 1} / {total})
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-1 font-academic">
            {currentQ.title}
          </h3>
        </div>

        {/* SVG Graph rendering */}
        <div className="h-48 bg-[#1a1c22] rounded-xl border border-zinc-800 flex items-center justify-center p-4">
          {currentQ.svgType === 'jump_discontinuity' && (
            <svg viewBox="0 0 200 100" className="w-52 h-36 text-amber-400 stroke-current stroke-2 fill-none" aria-label="Gráfico de discontinuidad de salto en x=0">
              <line x1="20" y1="50" x2="180" y2="50" stroke="#27272a" strokeWidth="1" />
              <line x1="100" y1="10" x2="100" y2="90" stroke="#27272a" strokeWidth="1" />
              <line x1="30" y1="70" x2="100" y2="55" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="100" cy="55" r="3" fill="#f59e0b" />
              <path d="M 100 30 Q 130 35 170 70" stroke="#f43f5e" strokeWidth="2.5" />
              <circle cx="100" cy="30" r="3" fill="none" stroke="#f43f5e" strokeWidth="1.5" />
            </svg>
          )}
          {currentQ.svgType === 'level_circles' && (
            <svg viewBox="0 0 100 100" className="size-40 stroke-amber-400 stroke-1.5 fill-none" aria-label="Curvas de nivel concéntricas en el plano xy">
              <circle cx="50" cy="50" r="10" />
              <circle cx="50" cy="50" r="22" />
              <circle cx="50" cy="35" r="35" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#27272a" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#27272a" strokeWidth="1" />
            </svg>
          )}
        </div>

        <p className="text-sm text-zinc-200 font-semibold text-center">
          {currentQ.questionPrompt}
        </p>

        <div className="space-y-3">
          {currentQ.options.map((opt, optIndex) => {
            const isChosen = selectedMysteryOption === opt.id;
            const optionLetter = ['A', 'B', 'C', 'D', 'E'][optIndex] || String.fromCharCode(65 + optIndex);
            return (
              <button
                key={opt.id}
                type="button"
                disabled={selectedMysteryOption !== null}
                onClick={() => onSelectOption(opt.id, opt.isCorrect)}
                className={`w-full p-4 sm:p-5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[52px] flex items-start gap-3.5 group ${
                  selectedMysteryOption 
                    ? opt.isCorrect 
                      ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200' 
                      : isChosen 
                        ? 'bg-rose-950/40 border-rose-500/80 text-rose-200' 
                        : 'bg-[#14161a] border-zinc-800/40 opacity-40 text-zinc-500'
                    : 'bg-[#1a1c22] hover:bg-zinc-800 border-zinc-800 text-zinc-200'
                }`}
              >
                <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                  selectedMysteryOption !== null
                    ? opt.isCorrect
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : isChosen
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-zinc-800/50 text-zinc-500 border border-zinc-700/30'
                    : 'bg-zinc-800 text-zinc-400 group-hover:border-zinc-600 group-hover:text-zinc-200 border border-zinc-700/60'
                }`}>
                  {optionLetter}
                </span>
                <div className="flex-1">
                  <div>{opt.text}</div>
                  {selectedMysteryOption && isChosen && (
                    <div className="mt-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800 font-normal leading-relaxed">
                      {opt.feedback}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedMysteryOption && (
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>Continuar</span>
              <IconArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
