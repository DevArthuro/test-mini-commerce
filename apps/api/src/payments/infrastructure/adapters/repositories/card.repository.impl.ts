import { Card } from 'src/payments/domain/entities/card.entity';
import { CardInterface } from '../../../../../interfaces';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CardRepository } from 'src/payments/domain/repositories/card.repository';

@Injectable()
export class InMemoryCardRepository implements CardRepository {
  constructor(private prisma: PrismaService) {}
  async createCard(card: CardInterface): Promise<Card> {
    const cardCreated = await this.prisma.card.create({
      data: {
        number: card.number,
        cvc: card.cvc,
        cardName: card.cardName,
        expMonth: card.expMonth,
        expYear: card.expYear,
      },
    });

    const cardEntity = new Card(
      cardCreated.id,
      cardCreated.number,
      cardCreated.cvc,
      cardCreated.expMonth,
      cardCreated.expYear,
      cardCreated.cardName,
    );

    return cardEntity;
  }
}
