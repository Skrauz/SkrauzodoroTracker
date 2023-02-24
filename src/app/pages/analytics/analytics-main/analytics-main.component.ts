import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, Chart, ChartConfiguration, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Timespan } from 'src/app/database/timespans/timespanModel';
// import {default as Annotation} from 'chartjs-plugin-annotation';
import { TimespansService } from 'src/app/database/timespans/timespans.service';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrls: ['./analytics-main.component.scss'],
})
export class AnalyticsMainComponent implements OnInit {
  constructor(
    private timespansService: TimespansService,
  ) {}

  ngOnInit(): void {
    this.refreshTimespans();
  }

  @ViewChild(BaseChartDirective) chartMain?: BaseChartDirective;

  chartType: ChartType = 'line';

  timespans$: Observable<Timespan[]> = new Observable();

  refreshTimespans() {
    this.timespans$ = this.timespansService.getTimespans();
  }

  chartDateRange: string[] = ['a','b','c']


  public chartData: ChartConfiguration['data'] = {
    labels: this.chartDateRange,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Test Data',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: true,
      },
    ],
  };

  legendColor: string = 'rgba(255,255,255,0.8)';
  public chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        labels: {
          color: this.legendColor,
        },
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
        ticks: {
          color: this.legendColor,
        },
        position: 'left',
        grace: '10%',

        grid: {
          color: 'rgba(255,255,255,0.3)',
        },
      },
      x: {
        ticks: {
          color: this.legendColor
        }
      },
    },
  };
}
