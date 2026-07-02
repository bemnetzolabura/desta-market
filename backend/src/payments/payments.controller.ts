import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { orderId: string; amount: number; transactionId: string }) {
    return this.paymentsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.findByOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.paymentsService.updateStatus(id, body.status);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/release')
  releaseEscrow(@Param('id') id: string) {
    return this.paymentsService.releaseEscrow(id);
  }
}
