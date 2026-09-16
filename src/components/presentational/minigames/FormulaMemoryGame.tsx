import React from 'react';
import { MemoryCard } from '../../../hooks/useMinigames';
import { MathView } from '../../common/MathView';
import { IconHelp, IconArrowLeft } from '../../icons';

interface FormulaMemoryGameProps {
  memoryCards: MemoryCard[];
  onFlipCard: (index: number) => void;
  onBackToHub: () => void;
}

export const FormulaMemoryGame: React.FC<FormulaMemoryGameProps> = ({
  memoryCards,
  onFlipCard,
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

      <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400">
              Memoria de Fórmulas y Definiciones
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-zinc-100 font-academic mt-1">
              Emparejamiento de Concepto ↔ Fórmula
            </h3>
          </div>
          <span className="text-xs text-zinc-400 font-mono">Encuentra los 4 pares</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {memoryCards.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => onFlipCard(idx)}
              aria-label={card.isFlipped || card.isMatched ? `Carta: ${card.text}` : `Carta oculta ${idx + 1}`}
              className={`h-32 p-3 rounded-xl border flex items-center justify-center text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                card.isMatched 
                  ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-300 opacity-80' 
                  : card.isFlipped 
                    ? 'bg-[#1a1c22] border-amber-500/80 text-zinc-100 shadow-sm' 
                    : 'bg-[#1a1c22] border-zinc-800 hover:bg-zinc-800 text-transparent'
              }`}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="text-xs font-bold leading-tight">
                  {card.isLatex ? <MathView math={card.text} block /> : card.text}
                </div>
              ) : (
                <IconHelp className="size-6 text-zinc-600" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
