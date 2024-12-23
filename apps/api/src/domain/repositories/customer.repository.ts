import { CustomerInterface } from 'src/interfaces';
import { Customer } from '../entities/customer.entity';
import { Delivery } from '../entities/delivery.entity';
import { Card } from '../entities/card.entity';

export interface CustomerRepository {
  createCustomer(
    customer: CustomerInterface,
    delivery: Delivery,
    card: Card,
  ): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
}
