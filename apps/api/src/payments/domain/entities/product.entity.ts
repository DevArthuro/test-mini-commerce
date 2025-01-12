export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly stock: number,
    public readonly price: number,
    public readonly imageUrl: string,
  ) {}

  public toValue(): PRODUCT_VISIBILITY_INFO {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      imageUrl: this.imageUrl,
    };
  }
}

export class ProductBought {
  constructor(
    public readonly id: string,
    public readonly total: number,
    public readonly quantity: number,
    public readonly product: Product,
  ) {}

  public toValue(): PRODUCT_BOUGHT_VISIBILITY_INFO {
    return {
      total: this.total,
      quantity: this.quantity,
      product: this.product.toValue(),
    }
  }
}

export interface PRODUCT_VISIBILITY_INFO {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
}

export interface PRODUCT_BOUGHT_VISIBILITY_INFO {
  total: number;
  quantity: number;
  product: PRODUCT_VISIBILITY_INFO;
}
