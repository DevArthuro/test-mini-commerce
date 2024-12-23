import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { CustomerRepository } from 'src/payments/domain/repositories/customer.repository';
import { CustomerInterface } from 'src/interfaces';

export class InMemoryCustomerRepository implements CustomerRepository {
  createCustomer(
    customer: CustomerInterface,
    delivery: Delivery,
    card: Card,
  ): Promise<Customer> {
      
  }
  findById(id: string): Promise<Customer | null> {}
}
