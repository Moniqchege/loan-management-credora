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
  
    const loanAmount = parseFloat(loan.loanAmount);
    const interestRate = parseFloat(loan.interestRate);
    const termMonths = parseInt(loan.termMonths, 10);
  
    if (
      isNaN(loanAmount) || loanAmount <= 0 ||
      isNaN(interestRate) ||
      isNaN(termMonths) || termMonths <= 0
    ) {
      console.error('Invalid loan data', loan);
      return [];
    }
  
    let remainingAmount = loanAmount;
    const monthlyInterestRate = interestRate / 100 / 12;
  
    let monthlyPayment: number;
  
    if (monthlyInterestRate === 0) {
      monthlyPayment = loanAmount / termMonths;
    } else {
      monthlyPayment = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths)) /
                       (Math.pow(1 + monthlyInterestRate, termMonths) - 1);
    }
  
    for (let i = 1; i <= termMonths; i++) {
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
