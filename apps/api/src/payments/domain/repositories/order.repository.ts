import { OrderInteface } from '../../../../interfaces';
import { Order, OrderStatus } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';

export abstract class OrderRepository {
  abstract create(
    order: OrderInteface,
    customer: Customer,
    product: Product,
  ): Promise<Order>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findByReference(reference: string): Promise<Order | null>;
  abstract updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
