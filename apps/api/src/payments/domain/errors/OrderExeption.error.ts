export class OrderException extends Error {
  private type: ERROR_ORDER_TYPE;
  constructor(message: string, type: ERROR_ORDER_TYPE) {
    super(message);
    this.type = type;
  }

  public getTypeError() {
    return this.type;
  }
}

export enum ERROR_ORDER_TYPE {
  ORDER_NOT_FOUND = 'Order not found',
  ORDER_NOT_CREATED = 'the order is not created',
  ORDER_UNKNOWN_DATA = 'Verify the data requirement',
}
