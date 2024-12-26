import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GetProductsCase } from 'src/payments/aplication/cases/getProducts.case';

@Controller('products')
export class ProductController {
  constructor(private readonly getProductCase: GetProductsCase) {}

  @Get('')
  async getAllProducts(@Res() res: Response) {
    try {
      const products = await this.getProductCase.execute();
      return res
        .json({ data: products, status: HttpStatus.OK, error: false })
        .status(HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
