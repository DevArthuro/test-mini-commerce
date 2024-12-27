import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract findAll(): Promise<Product[]>;
  abstract findById(id: string): Promise<Product | null>;
  abstract updateStockDecrease(
    id: string,
    quantity: number,
  ): Promise<Product | null>;
  abstract updateStockIncrease(
    id: string,
    quantity: number,
  ): Promise<Product | null>;
}
