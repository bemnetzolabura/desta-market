import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any, @Request() req) {
    return this.productsService.create({
      ...body,
      supplierId: req.user.id,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.productsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
