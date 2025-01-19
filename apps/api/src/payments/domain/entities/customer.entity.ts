import { TYPE_DOCUMENT } from '../dto/customer.dto';
import { Card, VISIBILITY_CARD_INFO } from './card.entity';
import { Delivery, VISIBILITY_DELIVERY_INFO } from './delivery.entity';

export class Customer {
  constructor(
    public readonly id: string,
    public readonly delivery: Delivery,
    public readonly card: Card,
    public readonly name: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly phoneNumber: string,
    public readonly typeDocument: TYPE_DOCUMENT,
    public readonly document: string,
  ) {}

  public toValue(): VISIBILITY_CUSTOMER_INFO {
    return {
      id: this.id,
      delivery: this.delivery.toValue(),
      card: this.card.toValue(),
      fullName: `${this.name} ${this.lastname}`,
      email: this.email,
      phoneNumber: this.phoneNumber,
      fullDocument: `${this.typeDocument}-${this.document}`,
    };
  }
}

export interface VISIBILITY_CUSTOMER_INFO {
  id: string;
  delivery: VISIBILITY_DELIVERY_INFO;
  card: VISIBILITY_CARD_INFO;
  fullName: string;
  email: string;
  phoneNumber: string;
  fullDocument: string;
}
