import { OrderEntity } from '../entities/order.entity';
import { OrderRulesService } from './order-rules.service';
import { describe, it, expect } from '@jest/globals';

describe('OrderRulesServiceTest', () => {
  const service = new OrderRulesService();

  it('allows a pending order with a positive quantity', () => {
    const mockOrder = {
      quantity: 2,
      status: 'pending',
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(mockOrder)).not.toThrow();
  });

  it('rejects a pending order that is already ready', () => {
    const mockOrder = {
      quantity: 2,
      status: 'ready',
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(mockOrder)).toThrow();
  });

  it('rejects a pending order with a negative quantity', () => {
    const mockOrder = {
      quantity: 0,
      status: 'pending',
    } as OrderEntity;

    expect(() => service.ensureCanBeMarkedAsReady(mockOrder)).toThrow();
  });
});
