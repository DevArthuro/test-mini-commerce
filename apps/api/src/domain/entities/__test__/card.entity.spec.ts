import { Card } from '../card.entity';
import type { VISIBILITY_CARD_INFO } from '../card.entity';
import { mockCard } from './mocks/card.mock';

describe('Card Entity', () => {
  it('It should create a new card', () => {
    const card = new Card(
      mockCard.id,
      mockCard.number,
      mockCard.cvc,
      mockCard.expMonth,
      mockCard.expYear,
      mockCard.cardName,
    );

    expect(card).toBeInstanceOf(Card);
    expect(card.id).toEqual(mockCard.id);
    expect(card.cardName).toEqual(mockCard.cardName);
  });

  it('It should have protection info', () => {
    const card = new Card(
      mockCard.id,
      mockCard.number,
      mockCard.cvc,
      mockCard.expMonth,
      mockCard.expYear,
      mockCard.cardName,
    );

    const visibility: VISIBILITY_CARD_INFO = {
      number: mockCard.number.slice(-4),
      exp_date: `${mockCard.expMonth}/${mockCard.expYear}`,
      cardName: mockCard.cardName,
    };

    expect(card.toValue()).toEqual(visibility);
  });
});
