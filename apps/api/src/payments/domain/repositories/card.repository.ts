import { CardInterface } from 'src/interfaces';
import { Card } from '../entities/card.entity';

export interface CardRepository {
  createCard(card: CardInterface): Promise<Card>;
  findById(id: string): Promise<Card | null>;
}
