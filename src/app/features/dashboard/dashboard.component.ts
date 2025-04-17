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
  loanStatusType: ChartType = 'doughnut'
  loanAmountsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'October', 'November', 'December'],
    datasets: [
      {
        label: '2024',
        data: [8000, 40000, 15000, 3000, 85000, 25000, 85000, 60000, 50000, 70000, 90000],
        backgroundColor: 'rgba(153, 102, 255, 0.4)',  
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      },
      {
        label: '2025',
        data: [10000, 50000, 20000, 5000, 100000, 35000, 100000, 80000, 65000, 75000, 100000],
        backgroundColor: 'rgba(102, 0, 204, 0.6)',  
        borderColor: 'rgba(102, 0, 204, 1)',
        borderWidth: 1
      }
    ]
  };
  
  loanAmountsOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Monthly Loan Amount'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  

  repaymentProgressData = {
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
    datasets: [
      {
        label: 'Loan Balance',
        data: [2000, 20000, 10000, 30000, 20000, 40000, 30000, 50000],
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
        backgroundColor: [ '#008000', '#FFFF00', '#FF0000' ],
        hoverBackgroundColor: [ '#66FF66', '#FFFF66', '#FF6666' ]
      }
    ]
  }

  loanStatusOptions = {
    responsive: true,
    cutout: '80%'
  }
}