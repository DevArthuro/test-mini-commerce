import { CustomerInterface } from 'src/interfaces';
import { Customer } from '../entities/customer.entity';
import { Delivery } from '../entities/delivery.entity';
import { Card } from '../entities/card.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class CustomerRepository {
  abstract createCustomer(
    customer: CustomerInterface,
    delivery: Delivery,
    card: Card,
  ): Promise<Customer>;
}
