import { Injectable } from '@nestjs/common';
import { Order } from './order.interface';

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    {
      id: 1,
      customer: 'john',
      item: 'cofefe',
      status: 'pending',
    },
    {
      id: 2,
      customer: 'jane',
      item: 'donuter',
      status: 'ready',
    },
  ];

  getAllOrders(): Order[] {
    return this.orders;
  }
}
