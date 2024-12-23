import { Card } from './card.entity';
import { Delivery } from './delivery.entity';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly delivery: Delivery,
    public readonly card: Card,
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: Date,
    public readonly phoneNumber: Date,
    public readonly typeDocument: string,
    public readonly document: string,
  ) {}
}
