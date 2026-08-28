import { Injectable } from '@nestjs/common';
import type { Loan } from './loan.interface';
import { CreateLoanDto } from './dto/create-loan.dto';
@Injectable()
export class LoansService {
  private loans: Loan[] = [
    {
      id: 1,
      student: 'joseph',
      equipment: 'camera',
      status: 'returned',
    },
    {
      id: 2,
      student: 'jotaro',
      equipment: 'hat',
      status: 'borrowed',
    },
  ];

  getAllLoans(status?: Loan): Loan[] {
    if (!status) {
      return this.loans;
    }

    return this.loans.filter((loan) => loan.status === 'borrowed');
  }

  create(data: CreateLoanDto): Loan {
    const newLoan: Loan = {
      id: this.loans.length + 1,
      student: data.student,
      equipment: data.equipment,
      status: 'borrowed',
    };

    this.loans.push(newLoan);

    return newLoan;
  }

  deleteLoan(id: number): Loan[] {
    const cutLoans = this.loans.filter((loan) => loan.id !== id);
    return (this.loans = cutLoans);
  }
}
