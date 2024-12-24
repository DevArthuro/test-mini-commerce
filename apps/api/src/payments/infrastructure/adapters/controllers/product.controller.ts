import { Controller, Get, NotFoundException } from '@nestjs/common';
import { GetProductsCase } from 'src/payments/aplication/cases/getProducts.case';

@Controller('products')
export class ProductController {
  constructor(private readonly getProductCase: GetProductsCase) {}

  @Get('')
  async getAllProducts() {
    try {
      const products = await this.getProductCase.execute();
      return products;
    } catch (error) {
      return new NotFoundException((error as Error).message);
    }
  }
}
