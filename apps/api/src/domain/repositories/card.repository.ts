import { Card } from '../entities/card.entity';

export interface CardRepository {
  createCard(card: Card): Promise<Card>;
  findById(id: string): Promise<Card | null>;
}
