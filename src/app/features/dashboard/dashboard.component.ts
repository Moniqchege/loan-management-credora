import { Component } from '@angular/core';
// import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // imports: [NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      { data: [120, 150, 180, 90, 100], label: 'Loan Applications' },
    ],
  };

  pieChartLabels = ['Paid', 'Unpaid', 'Overdue'];
  pieChartData = [300, 500, 200];
  pieChartType: ChartType = 'pie';
}
