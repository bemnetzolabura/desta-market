import { Controller, Get, Post, Put, Param, Body, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    if (req.user.role === 'ADMIN') {
      return this.ordersService.findAll();
    } else if (req.user.role === 'SHOPKEEPER') {
      return this.ordersService.findByShopkeeper(req.user.id);
    } else if (req.user.role === 'SUPPLIER') {
      return this.ordersService.findBySupplier(req.user.id);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.ordersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @Request() req) {
    return this.ordersService.create({
      ...body,
      shopkeeperId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
    return this.ordersService.updateStatus(id, body.status as 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED');
  }
}
