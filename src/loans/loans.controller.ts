import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import type { Loan } from './loan.interface';
import { CreateLoanDto } from './dto/create-loan.dto';

@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get()
  getAllLoans(@Query('status') status?: Loan) {
    return this.loansService.getAllLoans(status);
  }

  @Post()
  create(@Body() body: CreateLoanDto) {
    return this.loansService.create(body);
  }

  @Get(':id')
  deleteLoan(@Param('id') id: string) {
    const loan = this.loansService.deleteLoan(Number(id));

    if (!loan) {
      throw new NotFoundException('there is no loan with id ' + id);
    }

    return loan;
  }
}
