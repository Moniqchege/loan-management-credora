import { Component, OnInit } from '@angular/core';
import { Loan } from '../../core/models/loan.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoanService } from '../../core/services/loan.service';
import { Repayment } from '../../core/models/repayment.model';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class LoansComponent implements OnInit {
  loans: Loan[] = [];
  selectedLoanId: number | null = null;
  repaymentSchedule: Repayment[] = [];

  constructor(private loanService: LoanService) {}

  newLoan: Loan = {
    id: 0,
    customerName: '',
    loanAmount: '',
    interestRate: '',
    termMonths: '',
    startDate: '',
    status: 'Pending'
  };

  ngOnInit(): void {
    const allLoans = this.loanService.getLoans();
    const searchQuery = localStorage.getItem('searchQuery')?.toLowerCase() || '';
  
    this.loans = searchQuery
      ? allLoans.filter((loan: any) =>
          loan.customerName.toLowerCase().includes(searchQuery)
        )
      : allLoans;
  }

  addLoan(): void {
    this.newLoan.id = Date.now();
    this.loanService.addLoan({ ...this.newLoan });
    this.loans = this.loanService.getLoans();
    this.resetForm();
  }

  deleteLoan(id: number): void {
    this.loans = this.loans.filter(loan => loan.id !== id);
    localStorage.setItem('loans', JSON.stringify(this.loans));
  }

  resetForm(): void {
    this.newLoan = {
      id: 0,
      customerName: '',
      loanAmount: '',
      interestRate: '',
      termMonths: '',
      startDate: '',
      status: 'Pending'
    };
  }

  getRepaymentSchedule(loanId: number): Repayment[] {
    return this.loanService.getRepaymentSchedule(loanId);
  }

  toggleSchedule(id: number): void {
    if (this.selectedLoanId === id) {
      this.selectedLoanId = null;
      this.repaymentSchedule = [];
    } else {
      this.selectedLoanId = id;
      const loan = this.loans.find(l => l.id === id);
      if (loan) {
        this.repaymentSchedule = this.loanService.calculateRepaymentSchedule(loan);
      }
    }
  }
  
}
