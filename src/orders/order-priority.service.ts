import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderPriorityService {
  classify(order: OrderEntity): {
    orderId: number;
    status: string;
    quantity: number;
    priority: 'completed' | 'high' | 'medium' | 'normal';
  } {
    const priorityOrder
  }
}
