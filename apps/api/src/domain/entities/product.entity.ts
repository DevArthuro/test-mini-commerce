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
      name: this.name,
      description: this.description,
      stock: this.stock,
      price: this.price,
      imageUrl: this.imageUrl,
    };
  }
}

export interface PRODUCT_VISIBILITY_INFO {
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
}
