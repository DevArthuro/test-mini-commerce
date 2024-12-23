import { Order, OrderStatus } from '../entities/order.entity';

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  findByReference(reference: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
