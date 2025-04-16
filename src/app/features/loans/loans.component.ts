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

  constructor(private loanService: LoanService) {}

  newLoan: Loan = {
    id: 0,
    customerName: '',
    loanAmount: 0,
    interestRate: 0,
    termMonths: 0,
    startDate: '',
    status: 'Pending'
  };

  ngOnInit(): void {
    this.loans = this.loanService.getLoans();
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
      loanAmount: 0,
      interestRate: 0,
      termMonths: 0,
      startDate: '',
      status: 'Pending'
    };
  }

  getRepaymentSchedule(loanId: number): Repayment[] {
    return this.loanService.getRepaymentSchedule(loanId);
  }

  toggleSchedule(id: number): void {
    this.selectedLoanId = this.selectedLoanId === id ? null : id;
  }
}
