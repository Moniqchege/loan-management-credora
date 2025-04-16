import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartType, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  template: `<canvas #chartCanvas></canvas>`,
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() chartType: ChartType = 'bar'; 
  @Input() chartData: any;
  @Input() chartOptions: any;

  chart: any;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: this.chartType,
      data: this.chartData,
      options: this.chartOptions
    });
  }

  ngOnChange():void{
    if (this.chart) {
      this.chart.destroy();
      this.ngAfterViewInit();
    }
  }
}
