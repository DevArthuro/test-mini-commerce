export class ProductsException extends Error {
  private type: ERROR_PRODUCTS_TYPE;
  constructor(message: string, type: ERROR_PRODUCTS_TYPE) {
    super(message);
    this.type = type;
  }

  public getTypeError() {
    return this.type;
  }
}

export enum ERROR_PRODUCTS_TYPE {
  PRODUCT_NOT_FOUND = 'Product not found',
  PRODUCTS_NOT_FOUND = 'Products not found',
  STOCK_NOT_AVAILABLE = 'The stock request is nos available',
}
