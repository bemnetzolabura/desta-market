import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('delivery')
export class DeliveryController {
  constructor(private deliveryService: DeliveryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: { orderId: string; agentId: string }) {
    return this.deliveryService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/location')
  updateLocation(
    @Param('id') id: string,
    @Body() body: { latitude: number; longitude: number }
  ) {
    return this.deliveryService.updateLocation(id, body.latitude, body.longitude);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.deliveryService.updateStatus(id, body.status as 'ASSIGNED' | 'PICKED_UP' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED');
  }

  @UseGuards(JwtAuthGuard)
  @Get('agent/:agentId')
  findByAgent(@Param('agentId') agentId: string) {
    return this.deliveryService.findByAgent(agentId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('order/:orderId')
  findByOrder(@Param('orderId') orderId: string) {
    return this.deliveryService.findByOrder(orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.deliveryService.findById(id);
  }
}
