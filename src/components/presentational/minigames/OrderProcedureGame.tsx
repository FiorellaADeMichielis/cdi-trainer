import React from 'react';
import { ORDER_PROCEDURE_QUESTIONS } from '../../../data/minigamesData';
import { MathView } from '../../common/MathView';
import { IconArrowUp, IconArrowDown, IconCheck, IconClose, IconArrowLeft } from '../../icons';

export interface OrderStep {
  id: string;
  correctOrderIndex: number;
  textLatex: string;
}

interface OrderProcedureGameProps {
  orderSteps: OrderStep[];
  orderEvaluated: boolean;
  orderIsCorrect: boolean;
  onMoveStep: (fromIndex: number, toIndex: number) => void;
  onCheckOrder: () => void;
  onBackToHub: () => void;
}

export const OrderProcedureGame: React.FC<OrderProcedureGameProps> = ({
  orderSteps,
  orderEvaluated,
  orderIsCorrect,
  onMoveStep,
  onCheckOrder,
  onBackToHub
}) => {
  const currentTask = ORDER_PROCEDURE_QUESTIONS[0];

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
            Algoritmos Canónicos • Cátedra UNNE
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mt-1 font-academic">
            {currentTask.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
            Reordena los pasos algorítmicos utilizando los controles para cumplir con la resolución canónica exigida en examen.
          </p>
        </div>

        <div className="space-y-3">
          {orderSteps.map((step, index) => {
            let stepBorder = 'border-zinc-800';
            if (orderEvaluated) {
              stepBorder = step.correctOrderIndex === index ? 'border-emerald-500 bg-emerald-950/20' : 'border-rose-500 bg-rose-950/20';
            }

            return (
              <div
                key={step.id}
                className={`p-4 sm:p-5 rounded-xl bg-[#1a1c22] border ${stepBorder} flex items-center justify-between gap-4 transition-colors`}
              >
                <div className="flex items-center gap-3.5 overflow-x-auto">
                  <span className="size-7 rounded-full bg-[#14161a] text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-zinc-700">
                    {index + 1}
                  </span>
                  <div className="text-xs sm:text-sm font-medium text-zinc-200">
                    <MathView math={step.textLatex} />
                  </div>
                </div>

                {!orderEvaluated && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => onMoveStep(index, index - 1)}
                      className="p-1.5 rounded-lg bg-[#14161a] hover:bg-zinc-800 disabled:opacity-30 text-zinc-300 border border-zinc-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <IconArrowUp className="size-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === orderSteps.length - 1}
                      onClick={() => onMoveStep(index, index + 1)}
                      className="p-1.5 rounded-lg bg-[#14161a] hover:bg-zinc-800 disabled:opacity-30 text-zinc-300 border border-zinc-800 min-h-[36px] min-w-[36px] flex items-center justify-center"
                    >
                      <IconArrowDown className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {orderEvaluated && (
          <div className={`p-5 rounded-xl border text-xs sm:text-sm ${
            orderIsCorrect 
              ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200' 
              : 'bg-rose-950/40 border-rose-500 text-rose-200'
          }`}>
            <div className="flex items-center gap-2.5 font-bold font-mono">
              {orderIsCorrect ? <IconCheck className="size-5 text-emerald-400" /> : <IconClose className="size-5 text-rose-400" />}
              <span>{orderIsCorrect ? '¡Secuencia Algorítmica Impecable!' : 'Secuencia Incorrecta'}</span>
            </div>
          </div>
        )}

        {!orderEvaluated && (
          <div className="flex justify-end pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={onCheckOrder}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs font-mono transition-colors shadow-md"
            >
              Comprobar Ordenamiento
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
