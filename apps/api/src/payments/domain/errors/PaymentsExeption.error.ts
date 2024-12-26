export class PaymentsException extends Error {
  private type: ERROR_PAYMENTS_TYPE;
  constructor(message: string, type: ERROR_PAYMENTS_TYPE) {
    super(message);
    this.type = type;
  }

  public getTypeError() {
    return this.type;
  }
}

export enum ERROR_PAYMENTS_TYPE {
  PAYMENT_NOT_TOKENIZED = 'The card have errors',
  PAYMENT_IS_NOT_ALLOWED = 'Payment failed',
  ORDER_IS_ALREADY_USED = 'The order is already processed',
}
