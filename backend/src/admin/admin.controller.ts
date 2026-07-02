import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/orders')
  getOrdersAnalytics() {
    return this.adminService.getOrdersAnalytics();
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/payments')
  getPaymentsAnalytics() {
    return this.adminService.getPaymentsAnalytics();
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/delivery')
  getDeliveryAnalytics() {
    return this.adminService.getDeliveryAnalytics();
  }

  @UseGuards(JwtAuthGuard)
  @Get('analytics/suppliers')
  getSupplierAnalytics() {
    return this.adminService.getSupplierAnalytics();
  }
}
