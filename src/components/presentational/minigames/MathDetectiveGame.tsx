import React from 'react';
import { DETECTIVE_QUESTIONS } from '../../../data/minigamesData';
import { MathView } from '../../common/MathView';
import { IconArrowRight, IconArrowLeft } from '../../icons';

interface MathDetectiveGameProps {
  detectiveIndex: number;
  selectedFlawedStep: number | null;
  onSelectStep: (stepNumber: number, isFlawed: boolean) => void;
  onNext: () => void;
  onBackToHub: () => void;
}

export const MathDetectiveGame: React.FC<MathDetectiveGameProps> = ({
  detectiveIndex,
  selectedFlawedStep,
  onSelectStep,
  onNext,
  onBackToHub
}) => {
  const currentCase = DETECTIVE_QUESTIONS[detectiveIndex] || DETECTIVE_QUESTIONS[0];

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
          <span className="text-xs font-mono font-bold text-rose-400">
            Detective Matemático • Caso {detectiveIndex + 1} de {DETECTIVE_QUESTIONS.length}
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-1 font-academic">
            {currentCase.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
            {currentCase.problemStatement}
          </p>
        </div>

        <div className="space-y-4">
          {currentCase.steps.map((step) => {
            const isSelected = selectedFlawedStep === step.stepNumber;
            let style = 'bg-[#1a1c22] hover:bg-zinc-800 border-zinc-800';

            if (selectedFlawedStep !== null) {
              if (step.isFlawed) style = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200';
              else if (isSelected && !step.isFlawed) style = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
            }

            return (
              <button
                key={step.stepNumber}
                type="button"
                disabled={selectedFlawedStep !== null}
                onClick={() => onSelectStep(step.stepNumber, step.isFlawed)}
                className={`w-full p-5 rounded-xl border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${style}`}
              >
                <div className="text-xs font-bold text-zinc-300 mb-1.5 font-mono">
                  {step.label}
                </div>
                <div className="bg-[#14161a] p-3 rounded-lg border border-zinc-800">
                  <MathView math={step.contentLatex} block />
                </div>
                {selectedFlawedStep !== null && step.isFlawed && (
                  <div className="mt-3 p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300">
                    <strong>Explicación del error:</strong> {step.errorExplanation}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {selectedFlawedStep !== null && (
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onNext}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <span>{detectiveIndex + 1 < DETECTIVE_QUESTIONS.length ? 'Siguiente Caso' : 'Finalizar Detective'}</span>
              <IconArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
