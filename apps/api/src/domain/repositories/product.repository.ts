import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  updateStock(id: string, quantity: number): Promise<Product | null>;
}
