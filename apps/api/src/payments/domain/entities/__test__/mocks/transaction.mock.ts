import { mockOrder } from './order.mock';
import { TransactionStatus } from '../../transaction.entity';

export const mockTransaction = {
  id: 'txn_12345',
  order: mockOrder,
  status: TransactionStatus.APPROVED,
  referenceService: 'service_789',
  finalizedAt: new Date(),
};
