import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createOTP(email: string, code: string) {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    return this.prisma.oTP.create({
      data: {
        email,
        code,
        expiresAt,
      },
    });
  }

  async verifyOTP(email: string, code: string) {
    const otp = await this.prisma.oTP.findFirst({
      where: {
        email,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!otp) {
      return false;
    }

    await this.prisma.oTP.delete({
      where: { id: otp.id },
    });

    return true;
  }
}
