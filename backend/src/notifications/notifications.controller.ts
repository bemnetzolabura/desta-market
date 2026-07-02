import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('otp/generate')
  generateOTP(@Body() body: { email: string }) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return this.notificationsService.createOTP(body.email, code);
  }

  @UseGuards(JwtAuthGuard)
  @Post('otp/verify')
  verifyOTP(@Body() body: { email: string; code: string }) {
    return this.notificationsService.verifyOTP(body.email, body.code);
  }
}
