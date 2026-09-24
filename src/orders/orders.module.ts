import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
// import { OrderSummaryService } from './order-summary/order-summary.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, OrderEntity])],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRulesService,
    OrderPreparationEstimateService,
  ],
})
export class OrdersModule {}
