import { Order, OrderStatus } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { OrderInteface } from '../dto/order.dto';
import { ProductsInterface } from 'src/payments/aplication/dto/createOrder.dto';

export abstract class OrderRepository {
  abstract create(
    order: OrderInteface,
    customer: Customer,
    products: ProductsInterface[],
  ): Promise<Order>;
  abstract findById(id: string): Promise<Order | null>;
  abstract findByReference(reference: string): Promise<Order | null>;
  abstract updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
