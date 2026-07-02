import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: { shopkeeperId: string; supplierId: string; total: number; items: any[] }) {
    return this.prisma.order.create({
      data: {
        shopkeeperId: data.shopkeeperId,
        supplierId: data.supplierId,
        total: data.total,
        status: 'PENDING',
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { shopkeeper: true, supplier: true },
    });
  }

  async findByShopkeeper(shopkeeperId: string) {
    return this.prisma.order.findMany({
      where: { shopkeeperId },
      include: { supplier: true },
    });
  }

  async findBySupplier(supplierId: string) {
    return this.prisma.order.findMany({
      where: { supplierId },
      include: { shopkeeper: true },
    });
  }

  async findById(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { shopkeeper: true, supplier: true },
    });
  }

  async updateStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED') {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
