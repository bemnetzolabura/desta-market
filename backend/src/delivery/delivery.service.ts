import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async create(data: { orderId: string; agentId: string }) {
    return this.prisma.delivery.create({
      data: {
        orderId: data.orderId,
        agentId: data.agentId,
        status: 'ASSIGNED',
        latitude: 0,
        longitude: 0,
      },
    });
  }

  async updateLocation(id: string, latitude: number, longitude: number) {
    return this.prisma.delivery.update({
      where: { id },
      data: { latitude, longitude },
    });
  }

  async updateStatus(id: string, status: 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED') {
    return this.prisma.delivery.update({
      where: { id },
      data: { status },
    });
  }

  async findByAgent(agentId: string) {
    return this.prisma.delivery.findMany({
      where: { agentId },
      include: { order: true },
    });
  }

  async findByOrder(orderId: string) {
    return this.prisma.delivery.findUnique({
      where: { orderId },
      include: { order: true, agent: true },
    });
  }

  async findById(id: string) {
    return this.prisma.delivery.findUnique({
      where: { id },
      include: { order: true, agent: true },
    });
  }
}
