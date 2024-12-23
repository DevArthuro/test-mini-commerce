import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  createCustomer(customer: Customer): Promise<Customer>;
  findById(id: string): Promise<Customer | null>;
}
