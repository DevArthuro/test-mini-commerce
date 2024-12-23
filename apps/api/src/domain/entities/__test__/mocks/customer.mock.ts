import { mockCard } from './card.mock';
import { mockDelivery } from './delivery.mock';

export const mockCustomer = {
  id: '12345',
  delivery: mockDelivery,
  card: mockCard,
  name: 'Carlos',
  lastName: 'Orrego',
  email: 'carlos@gmail.com',
  phoneNumber: '+573207515166',
  typeDocument: 'CC',
  document: '123456789',
};
