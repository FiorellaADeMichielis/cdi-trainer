import React from 'react';
import { PROCEDURE_QUESTIONS, ProcedureQuestion } from '../../../data/minigamesData';
import { MathView } from '../../common/MathView';
import { IconArrowRight, IconArrowLeft } from '../../icons';

interface ProcedureSelectorGameProps {
  procedureIndex: number;
  selectedOptionId: string | null;
  currentQuestion?: ProcedureQuestion;
  totalQuestions?: number;
  onAnswer: (optionId: string, isCorrect: boolean) => void;
  onNext: () => void;
  onBackToHub: () => void;
}

export const ProcedureSelectorGame: React.FC<ProcedureSelectorGameProps> = ({
  procedureIndex,
  selectedOptionId,
  currentQuestion,
  totalQuestions,
  onAnswer,
  onNext,
  onBackToHub
}) => {
  const currentQ = currentQuestion || PROCEDURE_QUESTIONS[procedureIndex] || PROCEDURE_QUESTIONS[0];
  const total = totalQuestions ?? PROCEDURE_QUESTIONS.length;

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
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-amber-400">
            Reconocimiento de Estrategia ({procedureIndex + 1} / {total})
          </span>
          <span className="text-xs text-zinc-400 font-mono">
            {currentQ.unitId}
          </span>
        </div>

        <div className="p-6 rounded-xl bg-[#1a1c22] border border-zinc-800 text-center space-y-3">
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider font-mono">
            Expresión Analítica a Resolver
          </span>
          <div className="py-2 overflow-x-auto">
            <MathView math={currentQ.problemLatex} block />
          </div>
          <p className="text-sm text-zinc-200 font-medium">
            ¿Qué procedimiento analítico corresponde aplicar en primer lugar?
          </p>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, optIndex) => {
            const isChosen = selectedOptionId === opt.id;
            const optionLetter = ['A', 'B', 'C', 'D', 'E'][optIndex] || String.fromCharCode(65 + optIndex);
            let style = 'bg-[#1a1c22] hover:bg-zinc-800 border-zinc-800 text-zinc-200';

            if (selectedOptionId !== null) {
              if (opt.isCorrect) style = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
              else if (isChosen && !opt.isCorrect) style = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
              else style = 'bg-[#14161a] border-zinc-800/40 opacity-40 text-zinc-500';
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={selectedOptionId !== null}
                onClick={() => onAnswer(opt.id, opt.isCorrect)}
                className={`w-full p-4 sm:p-5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[52px] flex items-start gap-3.5 group ${style}`}
              >
                <span className={`size-7 rounded-full flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-colors ${
                  selectedOptionId !== null
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
                  {selectedOptionId !== null && isChosen && (
                    <div className="mt-2 text-xs text-zinc-300 pt-2 border-t border-zinc-800 font-normal leading-relaxed">
                      {opt.explanation}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedOptionId !== null && (
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{procedureIndex + 1 < PROCEDURE_QUESTIONS.length ? 'Siguiente Desafío' : 'Finalizar Estación'}</span>
              <IconArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
