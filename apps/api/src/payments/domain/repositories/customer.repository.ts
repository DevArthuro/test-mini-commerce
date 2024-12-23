import { CustomerInterface } from 'src/interfaces';
import { Customer } from '../entities/customer.entity';
import { Delivery } from '../entities/delivery.entity';
import { Card } from '../entities/card.entity';

export abstract class CustomerRepository {
  abstract createCustomer(
    customer: CustomerInterface,
    delivery: Delivery,
    card: Card,
  ): Promise<Customer>;
  abstract findById(id: string): Promise<Customer | null>;
}
