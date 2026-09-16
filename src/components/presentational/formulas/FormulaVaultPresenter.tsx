import React from 'react';
import { FormulaCard, SpacedCardReview } from '../../../types/domain';
import { FormulaCategory } from '../../../hooks/useFormulaVault';
import { MathView } from '../../common/MathView';
import { 
  IconSearch, 
  IconRotate, 
  IconCheckCircle, 
  IconWarning, 
  IconClose 
} from '../../icons';

interface FormulaVaultPresenterProps {
  filteredFormulas: FormulaCard[];
  formulasDueForReview: FormulaCard[];
  spacedCards: Record<string, SpacedCardReview>;
  selectedCategory: FormulaCategory;
  searchQuery: string;
  activeReviewCard: FormulaCard | null;
  isFlipped: boolean;
  onCategoryChange: (cat: FormulaCategory) => void;
  onSearchChange: (query: string) => void;
  onStartReview: (card: FormulaCard) => void;
  onCloseReview: () => void;
  onFlipCard: () => void;
  onRateReview: (quality: 0 | 1 | 3 | 5) => void;
}

const CATEGORIES: { id: FormulaCategory; label: string }[] = [
  { id: 'all', label: 'Todas las Unidades' },
  { id: 'derivatives', label: 'Derivadas' },
  { id: 'integrals', label: 'Integrales' },
  { id: 'multivariable', label: 'Varias Variables' },
  { id: 'series', label: 'Series' },
];

export const FormulaVaultPresenter: React.FC<FormulaVaultPresenterProps> = ({
  filteredFormulas,
  formulasDueForReview,
  spacedCards,
  selectedCategory,
  searchQuery,
  activeReviewCard,
  isFlipped,
  onCategoryChange,
  onSearchChange,
  onStartReview,
  onCloseReview,
  onFlipCard,
  onRateReview
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 sm:space-y-12 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 font-sans">
            Fórmulas y propiedades
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 font-sans mt-1">
            Fórmulas y teoremas de Cálculo
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Tarjetas para repasar definiciones, propiedades e integrales clave antes de rendir.
          </p>
        </div>

        {formulasDueForReview.length > 0 && (
          <button
            type="button"
            onClick={() => onStartReview(formulasDueForReview[0])}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-sm transition-colors min-h-[46px] cursor-pointer"
          >
            <IconRotate className="size-4 shrink-0" />
            <span>Repasar pendientes ({formulasDueForReview.length})</span>
          </button>
        )}
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#14161a] border border-zinc-800">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onCategoryChange(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-colors min-h-[38px] ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/80 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[260px]">
          <IconSearch className="size-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar fórmula o teorema..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#1a1c22] border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[40px]"
          />
        </div>
      </div>

      {/* Formulas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormulas.map((formula) => {
          const reviewData = spacedCards[formula.id];
          const repetitions = reviewData ? reviewData.repetitionCount : 0;

          return (
            <div
              key={formula.id}
              className="p-6 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-sm flex flex-col justify-between hover:border-zinc-700 transition-all space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-950/40 border border-amber-800/50 px-2.5 py-0.5 rounded">
                    {formula.unitId}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    Repasos: <strong className="text-zinc-200">{repetitions}</strong>
                  </span>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-100 font-sans">
                    {formula.name}
                  </h3>
                  <div className="p-4 my-3 rounded-xl bg-[#1a1c22] border border-zinc-800 overflow-x-auto text-center">
                    <MathView math={formula.latex} block />
                  </div>
                </div>

                {/* Pedagogy warnings */}
                <div className="space-y-2 text-xs text-zinc-400 font-sans leading-relaxed">
                  {formula.whenToUse && (
                    <div className="flex items-start gap-2">
                      <IconCheckCircle className="size-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Cuándo usar:</strong> {formula.whenToUse}</span>
                    </div>
                  )}
                  {formula.whenNotToUse && (
                    <div className="flex items-start gap-2 text-amber-300">
                      <IconWarning className="size-4 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Peligro:</strong> {formula.whenNotToUse}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 truncate max-w-[180px]">
                  {formula.topicTitle}
                </span>
                <button
                  type="button"
                  onClick={() => onStartReview(formula)}
                  className="px-3.5 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold border border-zinc-700 flex items-center gap-1.5 transition-colors min-h-[38px] cursor-pointer"
                >
                  <IconRotate className="size-3.5" />
                  <span>Repasar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spaced Review Flashcard Modal */}
      {activeReviewCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#14161a] border border-zinc-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-400">
                Tarjeta de repaso · {activeReviewCard.unitId}
              </span>
              <button
                type="button"
                onClick={onCloseReview}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 cursor-pointer"
              >
                <IconClose className="size-5" />
              </button>
            </div>

            {/* Flashcard Body */}
            <div 
              onClick={onFlipCard}
              className="p-8 rounded-xl bg-[#1a1c22] border border-zinc-800 cursor-pointer min-h-[200px] flex flex-col items-center justify-center text-center transition-all hover:border-zinc-700"
            >
              {!isFlipped ? (
                <div className="space-y-3">
                  <h4 className="text-lg sm:text-xl font-bold text-zinc-100 font-sans">
                    {activeReviewCard.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto">
                    {activeReviewCard.whenToUse || '¿Cuál es la fórmula o definición correspondiente?'}
                  </p>
                  <span className="text-xs text-amber-400 font-medium block pt-4">
                    (Hacé clic para dar vuelta la tarjeta)
                  </span>
                </div>
              ) : (
                <div className="space-y-4 animate-fadeIn">
                  <span className="text-xs text-zinc-400 font-medium">
                    Fórmula correspondiente:
                  </span>
                  <div className="overflow-x-auto py-2">
                    <MathView math={activeReviewCard.latex} block />
                  </div>
                  {activeReviewCard.frequentMistakes && activeReviewCard.frequentMistakes.length > 0 && (
                    <p className="text-xs text-amber-300 bg-amber-950/30 p-3 rounded-lg border border-amber-800/40 text-left">
                      <strong>Error común:</strong> {activeReviewCard.frequentMistakes[0]}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Evaluation Buttons */}
            {isFlipped && (
              <div className="space-y-3 animate-fadeIn">
                <span className="text-xs text-zinc-400 block text-center font-medium">
                  ¿Cómo te resultó recordarla?
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => onRateReview(0)}
                    className="p-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    No me acordaba
                  </button>
                  <button
                    type="button"
                    onClick={() => onRateReview(1)}
                    className="p-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-800/60 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Me costó
                  </button>
                  <button
                    type="button"
                    onClick={() => onRateReview(3)}
                    className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Bien
                  </button>
                  <button
                    type="button"
                    onClick={() => onRateReview(5)}
                    className="p-2.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Muy clara
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
