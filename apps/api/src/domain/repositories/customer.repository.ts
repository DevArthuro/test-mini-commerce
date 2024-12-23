import { CustomerInterface } from 'src/interfaces';
import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  createCustomer(customer: CustomerInterface): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
}
