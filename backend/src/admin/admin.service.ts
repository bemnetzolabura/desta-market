import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [users, products, orders, payments, deliveries] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.payment.count(),
      this.prisma.delivery.count(),
    ]);

    return {
      users,
      products,
      orders,
      payments,
      deliveries,
    };
  }

  async getOrdersAnalytics() {
    const orders = await this.prisma.order.findMany();
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});

    return statusCounts;
  }

  async getPaymentsAnalytics() {
    const payments = await this.prisma.payment.findMany();
    const statusCounts = payments.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {});

    return statusCounts;
  }

  async getDeliveryAnalytics() {
    const deliveries = await this.prisma.delivery.findMany();
    const statusCounts = deliveries.reduce((acc, delivery) => {
      acc[delivery.status] = (acc[delivery.status] || 0) + 1;
      return acc;
    }, {});

    return statusCounts;
  }

  async getSupplierAnalytics() {
    const suppliers = await this.prisma.user.findMany({
      where: { role: 'SUPPLIER' },
      include: {
        products: true,
        ordersAsSupplier: true,
      },
    });

    return suppliers.map(supplier => ({
      id: supplier.id,
      name: supplier.name,
      email: supplier.email,
      productCount: supplier.products.length,
      orderCount: supplier.ordersAsSupplier.length,
    }));
  }
}
