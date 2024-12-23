import { OrderInteface } from 'src/interfaces';
import { Order, OrderStatus } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { Product } from '../entities/product.entity';

export interface OrderRepository {
  create(
    order: OrderInteface,
    customer: Customer,
    product: Product,
  ): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByReference(reference: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
