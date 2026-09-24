import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomerEntity } from './entities/customer.entity';
import { OrderEntity } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRulesService } from './order-rules/order-rules.service';
import { OrderPreparationEstimateService } from './order-preparation-estimate/order-preparation-estimate.service';
// import { OrderSummaryService } from './order-summary/order-summary.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly ordersRepository: Repository<OrderEntity>,

    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,

    private readonly orderRulesService: OrderRulesService,

    private readonly orderPreparationEstimateService: OrderPreparationEstimateService,
    // private readonly orderSummaryService: OrderSummaryService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.customer_id,
    });

    if (!customer) {
      throw new NotFoundException(
        `Customer with id ${createOrderDto.customer_id} was not found`,
      );
    }

    const order = this.ordersRepository.create({
      item: createOrderDto.item,
      quantity: createOrderDto.quantity,
      status: 'pending',
      customer,
    });

    return this.ordersRepository.save(order);
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      relations: {
        customer: true,
      },
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<OrderEntity> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        customer: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} was not found`);
    }

    return order;
  }

  async update(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.ordersRepository.merge(order, updateOrderDto);

    return this.ordersRepository.save(order);
  }

  async remove(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    return this.ordersRepository.remove(order);
  }

  async markAsReady(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);

    this.orderRulesService.ensureCanBeMarkedAsReady(order);

    order.status = 'ready';

    return this.ordersRepository.save(order);
  }

  // async summary(): Promise<OrderEntity[]> {
  //   return this.orderSummaryService.ensureSummary();
  // }

  async estimatePreparationTime(id: number): Promise<{
    orderId: number;
    status: string;
    estimatedTime: number;
  }> {
    const order = await this.findOne(id);

    return this.orderPreparationEstimateService.estimate(order);
  }

  async findRecentPending(): Promise<OrderEntity[]> {
    return this.ordersRepository.find({
      where: { status: 'pending' },
      // where: { quantity: MoreThan(1) },
      relations: { customer: true },
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }
}
