import { useState, useMemo, useCallback } from 'react';
import { FormulaCard, SpacedCardReview } from '../types/domain';
import { FORMULA_CARDS } from '../data/formulasData';
import { soundService } from '../services/soundService';

interface UseFormulaVaultProps {
  spacedCards: Record<string, SpacedCardReview>;
  onReviewFormula: (formulaId: string, quality: 0 | 1 | 3 | 5) => void;
}

export type FormulaCategory = 'all' | 'derivatives' | 'integrals' | 'multivariable' | 'series';

export const useFormulaVault = ({
  spacedCards,
  onReviewFormula
}: UseFormulaVaultProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FormulaCategory>('all');
  const [activeReviewCard, setActiveReviewCard] = useState<FormulaCard | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    return FORMULA_CARDS.filter(card => {
      let matchesCategory = true;
      if (selectedCategory === 'derivatives') {
        matchesCategory = ['U2', 'U3', 'U4'].includes(card.unitId);
      } else if (selectedCategory === 'integrals') {
        matchesCategory = ['U5', 'U6'].includes(card.unitId);
      } else if (selectedCategory === 'multivariable') {
        matchesCategory = ['U7', 'U8'].includes(card.unitId);
      } else if (selectedCategory === 'series') {
        matchesCategory = ['U9', 'U10'].includes(card.unitId);
      }

      const matchesSearch = searchQuery.trim() === '' || 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.latex.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.unitId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Formulas due for Leitner review
  const formulasDueForReview = useMemo(() => {
    const now = Date.now();
    return FORMULA_CARDS.filter(card => {
      const rev = spacedCards[card.id];
      return !rev || rev.nextReviewTimestamp <= now;
    });
  }, [spacedCards]);

  const handleStartReview = useCallback((card: FormulaCard) => {
    soundService.playClick();
    setActiveReviewCard(card);
    setIsFlipped(false);
  }, []);

  const handleFlipCard = useCallback(() => {
    soundService.playClick();
    setIsFlipped(prev => !prev);
  }, []);

  const handleRateReview = useCallback((quality: 0 | 1 | 3 | 5) => {
    if (!activeReviewCard) return;
    if (quality >= 3) {
      soundService.playCorrect();
    } else {
      soundService.playIncorrect();
    }
    onReviewFormula(activeReviewCard.id, quality);
    setActiveReviewCard(null);
    setIsFlipped(false);
  }, [activeReviewCard, onReviewFormula]);

  const handleCloseReview = useCallback(() => {
    soundService.playClick();
    setActiveReviewCard(null);
    setIsFlipped(false);
  }, []);

  return {
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
  };
};
