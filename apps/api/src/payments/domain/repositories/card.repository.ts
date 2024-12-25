import { CardInterface } from '../dto/card.dto';
import { Card } from '../entities/card.entity';

export abstract class CardRepository {
  abstract createCard(card: CardInterface): Promise<Card>;
}
