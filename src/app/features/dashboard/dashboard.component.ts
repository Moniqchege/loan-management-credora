import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartComponent } from '../../shared/components/chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  loanAmountsData = {
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Loan Amounts',
        data: [10000, 50000, 20000, 5000, 100000, 35000, 100000, 80000, 65000, 75000, 100000],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  loanAmountsOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  repaymentProgressData = {
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Loan Balance',
        data: [5000, 40000, 2000, 500, 90000, 15000, 50000, 70000, 55000, 35000, 98000],
        fill: false,
        borderColor: 'rgba(75, 192, 192)',
        tension: 0.1
      }
    ]
  }

  repaymentProgressOptions = {
    responsive: true
  }

  loanStatusData = {
    labels: ['Aprroved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [10, 5, 3],
        backgroundColor: ['#FF0000', '#FFFF00', '#008000'],
        hoverBackgroundColor: ['#FF6666', '#FFFF66', '#66FF66']
      }
    ]
  }

  loanStatusOptions = {
    responsive: true
  }
}