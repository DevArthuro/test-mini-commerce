import { ProductRepository } from 'src/domain/repositories/product.repository';
import { PRODUCT_VISIBILITY_INFO } from 'src/domain/entities/product.entity';

export class GetProductsCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<PRODUCT_VISIBILITY_INFO[]> {
    const products = await this.productRepository.findAll();
    const productsSerializer = products.map((product) => product.toValue());
    return productsSerializer;
  }
}
