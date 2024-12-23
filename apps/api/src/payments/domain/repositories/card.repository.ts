import { CardInterface } from 'src/interfaces';
import { Card } from '../entities/card.entity';

export abstract class CardRepository {
  abstract createCard(card: CardInterface): Promise<Card>;
}
