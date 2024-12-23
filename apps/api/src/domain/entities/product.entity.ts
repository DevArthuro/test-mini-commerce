export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly stock: number,
    public readonly price: number,
    public readonly imageUrl: string,
  ) {}
}
