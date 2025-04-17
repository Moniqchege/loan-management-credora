export interface Loan {
    id: number;
    customerName: string;
    loanAmount: number | null;
    interestRate: number | null;
    termMonths: number | null; 
    startDate: string; 
    status: string;
  }
  