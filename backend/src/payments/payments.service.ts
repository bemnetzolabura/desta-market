import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { orderId: string; amount: number; transactionId: string }) {
    return this.prisma.payment.create({
      data: {
        orderId: data.orderId,
        amount: data.amount,
        transactionId: data.transactionId,
        status: 'HELD_IN_ESCROW',
      },
    });
  }

  async findByOrder(orderId: string) {
    return this.prisma.payment.findMany({
      where: { orderId },
    });
  }

  async updateStatus(id: string, status: 'PENDING' | 'HELD_IN_ESCROW' | 'RELEASED' | 'FAILED') {
    return this.prisma.payment.update({
      where: { id },
      data: { status },
    });
  }

  async releaseEscrow(paymentId: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'RELEASED' },
    });
  }
}
