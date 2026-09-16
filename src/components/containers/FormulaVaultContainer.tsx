import React from 'react';
import { SpacedCardReview } from '../../types/domain';
import { useFormulaVault } from '../../hooks/useFormulaVault';
import { FormulaVaultPresenter } from '../presentational/formulas/FormulaVaultPresenter';

interface FormulaVaultContainerProps {
  spacedCards: Record<string, SpacedCardReview>;
  onReviewFormula: (formulaId: string, quality: 0 | 1 | 3 | 5) => void;
}

export const FormulaVaultContainer: React.FC<FormulaVaultContainerProps> = ({
  spacedCards,
  onReviewFormula
}) => {
  const {
    searchQuery,
    selectedCategory,
    activeReviewCard,
    isFlipped,
    filteredFormulas,
    formulasDueForReview,
    setSearchQuery,
    setSelectedCategory,
    handleStartReview,
    handleFlipCard,
    handleRateReview,
    handleCloseReview
  } = useFormulaVault({
    spacedCards,
    onReviewFormula
  });

  return (
    <FormulaVaultPresenter
      searchQuery={searchQuery}
      selectedCategory={selectedCategory}
      activeReviewCard={activeReviewCard}
      isFlipped={isFlipped}
      filteredFormulas={filteredFormulas}
      formulasDueForReview={formulasDueForReview}
      spacedCards={spacedCards}
      onSearchChange={setSearchQuery}
      onCategoryChange={setSelectedCategory}
      onStartReview={handleStartReview}
      onFlipCard={handleFlipCard}
      onRateReview={handleRateReview}
      onCloseReview={handleCloseReview}
    />
  );
};

