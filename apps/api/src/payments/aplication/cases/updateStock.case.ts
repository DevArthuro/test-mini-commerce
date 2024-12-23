import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import { UpdateStockDTO } from '../dto/updateStock.dto';
import { Injectable } from 'src/shared/injectable';

@Injectable()
export class UpdateStockCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(dto: UpdateStockDTO): Promise<boolean> {
    const productUpdated = await this.productRepository.updateStock(
      dto.productId,
      dto.quantity,
    );
    if (!productUpdated) {
      return false;
    }
    return true;
  }
}
