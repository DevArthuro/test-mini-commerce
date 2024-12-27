import { Injectable } from '@nestjs/common';
import { Product } from 'src/payments/domain/entities/product.entity';
import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    const productsEnities = products.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.description,
          product.stock,
          Number(product.price),
          product.imageUrl,
        ),
    );

    return productsEnities;
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    if (!product) {
      return;
    }

    return new Product(
      product.id,
      product.name,
      product.description,
      product.stock,
      Number(product.price),
      product.imageUrl,
    );
  }

  async updateStockIncrease(
    id: string,
    quantity: number,
  ): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      return;
    }
    const newStock = product.stock + quantity;
    await this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
    return this.findById(id);
  }

  async updateStockDecrease(
    id: string,
    quantity: number,
  ): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      return;
    }
    const newStock = product.stock - quantity;
    await this.prisma.product.update({
      where: { id },
      data: { stock: newStock },
    });
    return this.findById(id);
  }
}
