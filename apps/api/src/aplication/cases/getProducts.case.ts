import { OrderRepository } from 'src/domain/repositories/order.repository';
import { PaymentGatewayPort } from 'src/domain/ports/paymentGateway.port';
import { CreateTransactionDTO } from '../dto/createTransaction.dto';
import { VISIBILITY_TRANSACTION_INFO } from 'src/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { PRODUCT_VISIBILITY_INFO } from 'src/domain/entities/product.entity';

export class GetProductsCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(): Promise<PRODUCT_VISIBILITY_INFO[]> {
    const products = await this.productRepository.findAll();
    return products;
  }
}
