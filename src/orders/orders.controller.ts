import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // @Get('summary')
  // summary() {
  //   return this.ordersService.summary();
  // }

  @Get('pending')
  findRecentPending() {
    return this.ordersService.findRecentPending();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(Number(id), updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(Number(id));
  }

  @Patch(':id/ready')
  markAsReady(@Param('id') id: string) {
    return this.ordersService.markAsReady(Number(id));
  }

  @Get(':id/estimate')
  estimatePrepatationTime(@Param('id') id: string) {
    return this.ordersService.estimatePreparationTime(Number(id));
  }
}
