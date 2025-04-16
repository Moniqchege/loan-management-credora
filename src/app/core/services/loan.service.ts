import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { Repayment } from '../models/repayment.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private loans: Loan[] = JSON.parse(localStorage.getItem('loans')!) || [];

  getLoans(): Loan[] {
    return this.loans;
  }

  addLoan(loan: Loan) {
    this.loans.push(loan);
    localStorage.setItem('loans', JSON.stringify(this.loans));
  }

  calculateRepaymentSchedule(loan: Loan): Repayment[] {
    const repayments: Repayment[] = [];
    let remainingAmount = loan.loanAmount;
    const monthlyInterestRate = loan.interestRate / 100 / 12;
    const monthlyPayment = remainingAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loan.termMonths)) / 
                           (Math.pow(1 + monthlyInterestRate, loan.termMonths) - 1);
  
    for (let i = 1; i <= loan.termMonths; i++) {
      const interest = remainingAmount * monthlyInterestRate;
      const principal = monthlyPayment - interest;
      remainingAmount -= principal;
  
      repayments.push({ 
        month: i, 
        principal: parseFloat(principal.toFixed(2)), 
        interest: parseFloat(interest.toFixed(2)), 
        totalPayment: parseFloat(monthlyPayment.toFixed(2)),
        balance: parseFloat(Math.max(remainingAmount, 0).toFixed(2)) 
 
      });
    }
  
    return repayments;
  }
  

  getRepaymentSchedule(loanId: number): Repayment[] {
    const loan = this.loans.find(l => l.id === loanId);
    return loan ? this.calculateRepaymentSchedule(loan) : [];
  }
}
