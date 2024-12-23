import { CardInterface } from 'src/interfaces';
import { Card } from '../entities/card.entity';

export abstract class CardRepository {
  abstract createCard(card: CardInterface): Promise<Card>;
  abstract findById(id: string): Promise<Card | null>;
}
