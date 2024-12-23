import { Card } from '../card.entity';
import { mockCard } from './mocks/card.mock';
import type { VISIBILITY_CARD_INFO } from '../card.entity';
import type { VISIBILITY_DELIVERY_INFO } from '../delivery.entity';
import type { VISIBILITY_CUSTOMER_INFO } from '../customer.entity';
import type { PRODUCT_VISIBILITY_INFO } from '../product.entity';
import { Delivery } from '../delivery.entity';
import { mockDelivery } from './mocks/delivery.mock';
import { Customer } from '../customer.entity';
import { mockCustomer } from './mocks/customer.mock';
import { Product } from '../product.entity';
import { mockProduct } from './mocks/product.mock';

describe('Test all entities', () => {
  describe('Card Entity', () => {
    it('It should create a new card', () => {
      const card = new Card(
        mockCard.id,
        mockCard.number,
        mockCard.cvc,
        mockCard.expMonth,
        mockCard.expYear,
        mockCard.cardName,
      );

      expect(card).toBeInstanceOf(Card);
      expect(card.id).toEqual(mockCard.id);
      expect(card.cardName).toEqual(mockCard.cardName);
    });

    it('It should have protection info', () => {
      const card = new Card(
        mockCard.id,
        mockCard.number,
        mockCard.cvc,
        mockCard.expMonth,
        mockCard.expYear,
        mockCard.cardName,
      );

      const visibility: VISIBILITY_CARD_INFO = {
        number: mockCard.number.slice(-4),
        exp_date: `${mockCard.expMonth}/${mockCard.expYear}`,
        cardName: mockCard.cardName,
      };

      expect(card.toValue()).toEqual(visibility);
    });
  });
  describe('Delivery Entity', () => {
    it('It should be create the delivery', () => {
      const delivery = new Delivery(
        mockDelivery.id,
        mockDelivery.countryCode,
        mockDelivery.country,
        mockDelivery.region,
        mockDelivery.city,
        mockDelivery.address,
      );

      expect(delivery.countryCode).toEqual(mockDelivery.countryCode);
      expect({ city: delivery.city, code: delivery.countryCode }).toEqual({
        city: mockDelivery.city,
        code: mockDelivery.countryCode,
      });
    });

    it('It should have the visibility Info', () => {
      const delivery = new Delivery(
        mockDelivery.id,
        mockDelivery.countryCode,
        mockDelivery.country,
        mockDelivery.region,
        mockDelivery.city,
        mockDelivery.address,
      );

      const deliveryResult: VISIBILITY_DELIVERY_INFO = {
        country: mockDelivery.country,
        region: mockDelivery.region,
        city: mockDelivery.city,
        address: mockDelivery.address,
      };

      expect(delivery.toValue()).toEqual(deliveryResult);
    });
  });
  describe('Customer Entity', () => {
    const delivery = new Delivery(
      mockCustomer.delivery.id,
      mockCustomer.delivery.countryCode,
      mockCustomer.delivery.country,
      mockCustomer.delivery.region,
      mockCustomer.delivery.city,
      mockCustomer.delivery.address,
    );
    const card = new Card(
      mockCustomer.card.id,
      mockCustomer.card.number,
      mockCustomer.card.cvc,
      mockCustomer.card.expMonth,
      mockCustomer.card.expYear,
      mockCustomer.card.cardName,
    );
    const customer = new Customer(
      mockCustomer.id,
      delivery,
      card,
      mockCustomer.name,
      mockCustomer.lastName,
      mockCustomer.email,
      mockCustomer.phoneNumber,
      mockCustomer.typeDocument,
      mockCustomer.document,
    );
    it('It should be create the customer', () => {
      expect(customer).toBeInstanceOf(Customer);
      expect(customer.card.getLatestDigitsCard()).toBe(
        mockCustomer.card.number.slice(-4),
      );
      expect(customer.delivery.countryCode).toEqual(
        mockCustomer.delivery.countryCode,
      );
    });

    it('It should be visibility info', () => {
      const customerFormatResult: VISIBILITY_CUSTOMER_INFO = {
        delivery: delivery.toValue(),
        card: card.toValue(),
        fullName: `${mockCustomer.name} ${mockCustomer.lastName}`,
        email: mockCustomer.email,
        phoneNumber: mockCustomer.phoneNumber,
        fullDocument: `${mockCustomer.typeDocument}-${mockCustomer.document}`,
      };

      expect(customer.toValue()).toEqual(customerFormatResult);
    });
  });
  describe('Product Entity', () => {
    it('It should create a new product', () => {
      const product = new Product(
        mockProduct.id,
        mockProduct.name,
        mockProduct.description,
        mockProduct.stock,
        mockProduct.price,
        mockProduct.imageUrl,
      );
      expect(product).toBeInstanceOf(Product);
      expect(product.price).toEqual(mockProduct.price);
      expect(product.stock).toEqual(mockProduct.stock);
    });

    it('It should have visibility info', () => {
      const product = new Product(
        mockProduct.id,
        mockProduct.name,
        mockProduct.description,
        mockProduct.stock,
        mockProduct.price,
        mockProduct.imageUrl,
      );

      const productFormatResult: PRODUCT_VISIBILITY_INFO = {
        name: mockProduct.name,
        description: mockProduct.description,
        stock: mockProduct.stock,
        price: mockProduct.price,
        imageUrl: mockProduct.imageUrl,
      };

      expect(product.toValue()).toEqual(productFormatResult);
    });
  });
});
