export interface Loan {
  id: number;
  student: string;
  equipment: string;
  status: 'borrowed' | 'returned';
}
