import { OrderStatus } from '../../order.entity';
import { mockCustomer } from './customer.mock';
import { mockProduct } from './product.mock';

export const mockOrder = {
  id: '12345',
  customer: mockCustomer,
  product: mockProduct,
  quantity: 4,
  feeBought: mockProduct.price * 0.05,
  feeDelivery: mockProduct.price * 0.05,
  tokenizedCard: 'tok-enjfhjhdskj',
  reference: 'MINI_COMMERCE_12345',
  status: OrderStatus.PENDING,
};
