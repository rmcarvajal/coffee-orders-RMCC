import { OrderEntity } from '../entities/order.entity';
import { OrderPreparationEstimateService } from './order-preparation-estimate.service';
import { describe, it, expect } from '@jest/globals';

describe('OrderPreparationEstimateServiceTest', () => {
  const service = new OrderPreparationEstimateService();

  it('return order estimate in 0 because status is ready', () => {
    const mockOrder = {
      quantity: 2,
      status: 'ready',
      id: 1,
    } as OrderEntity;

    expect(service.estimate(mockOrder)).toStrictEqual({
      orderId: 1,
      status: 'ready',
      estimatedMinutes: 0,
    });
  });
});
