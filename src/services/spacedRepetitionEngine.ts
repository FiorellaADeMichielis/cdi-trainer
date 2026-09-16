import { SpacedCardReview } from '../types/domain';

export class SpacedRepetitionEngine {
  private static readonly MIN_EASE_FACTOR = 1.3;
  private static readonly INITIAL_EASE_FACTOR = 2.5;

  /**
   * Initializes a new card in the spaced repetition schedule
   */
  public static initCard(formulaId: string): SpacedCardReview {
    return {
      formulaId,
      intervalDays: 1,
      repetitionCount: 0,
      easeFactor: this.INITIAL_EASE_FACTOR,
      nextReviewTimestamp: Date.now(), // available immediately
      lastReviewedTimestamp: 0,
      consecutiveSuccess: 0
    };
  }

  /**
   * Updates card review interval using modified SM-2 for an intensive 1-month exam cycle
   * quality: 0 (No me acuerdo), 1 (Incorrecto), 3 (Dudoso/Con esfuerzo), 5 (Perfecto/Instantáneo)
   */
  public static reviewCard(
    current: SpacedCardReview,
    quality: 0 | 1 | 3 | 5
  ): SpacedCardReview {
    const now = Date.now();
    let { intervalDays, repetitionCount, easeFactor, consecutiveSuccess } = current;

    if (quality < 3) {
      // Failed or "No me acuerdo"
      repetitionCount = 0;
      consecutiveSuccess = 0;
      // In 28-day intensive mode, failed cards return in 4 hours or next day
      intervalDays = 0.5; // review same day
      easeFactor = Math.max(this.MIN_EASE_FACTOR, easeFactor - 0.2);
    } else {
      // Succeeded
      consecutiveSuccess += 1;
      repetitionCount += 1;

      if (consecutiveSuccess === 1) {
        intervalDays = 1;
      } else if (consecutiveSuccess === 2) {
        intervalDays = 3;
      } else if (consecutiveSuccess === 3) {
        intervalDays = 6;
      } else {
        intervalDays = Math.round(intervalDays * easeFactor);
      }

      // Update ease factor based on performance
      easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      easeFactor = Math.max(this.MIN_EASE_FACTOR, easeFactor);
    }

    const nextReviewTimestamp = now + (intervalDays * 24 * 60 * 60 * 1000);

    return {
      ...current,
      intervalDays,
      repetitionCount,
      easeFactor,
      consecutiveSuccess,
      lastReviewedTimestamp: now,
      nextReviewTimestamp
    };
  }

  /**
   * Filter cards that are due for review today
   */
  public static getDueCards(cards: Record<string, SpacedCardReview>): string[] {
    const now = Date.now();
    return Object.values(cards)
      .filter(card => card.nextReviewTimestamp <= now)
      .map(card => card.formulaId);
  }
}
