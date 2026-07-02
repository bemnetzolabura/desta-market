import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; price: number; stock: number; supplierId: string; imageUrl: string }) {
    return this.prisma.product.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: { supplier: true },
    });
  }

  async findBySupplier(supplierId: string) {
    return this.prisma.product.findMany({
      where: { supplierId },
    });
  }

  async findById(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { supplier: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
