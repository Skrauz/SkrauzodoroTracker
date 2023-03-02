import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import {
  ChartType,
  Chart,
  ChartConfiguration,
  ChartEvent,
  ChartData,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, last } from 'rxjs';
import { Timespan } from 'src/app/database/timespans/timespanModel';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { formatDateEnGB } from './formatDate';
import { constructDatasets } from './constructDatasets';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrls: ['./analytics-main.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class AnalyticsMainComponent implements OnInit {
  constructor(private timespansService: TimespansService) {}

  ngOnInit(): void {
    this.refreshTimespans();
    this.applyLabelRange();
    this.chartData.datasets = constructDatasets(this.timespans$, this.chartData.labels);
    this.timespans$.subscribe(() => {
      this.mainChart?.update();
    })
  }

  public chartType: ChartType = 'bar';

  timespans$: Observable<Timespan[]> = new Observable();

  refreshTimespans() {
    this.timespans$ = this.timespansService.getTimespans();
  }

  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;

  public chartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [],
  };

  public chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        displayColors: false
      },
      title: {
        display: true,
        text: "Time spent on tasks in the last week"
      }

    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Minutes"
        },
        stacked: true,
        position: 'left',
        ticks: {
          color: 'rgba(255,255,255,0.8)',
        },
        grid: {
          color: 'rgba(255,255,255,0.3)',
        },
      },
      x: {
        stacked: true,
        ticks: {
          color: 'rgba(255,255,255,0.8)',
        },
      },
    },
  };



  @ViewChild(BaseChartDirective) mainChart?: BaseChartDirective;

  applyLabelRange(): void {
    this.chartData?.labels?.splice(0, this.chartData?.labels?.length);

    // Generate latest week and push to the labels
    let lastWeek: string[] = [];
    let now = new Date();
    for (let i = 0; i < 7; i++) {
      lastWeek.push(formatDateEnGB(now));
      now.setDate(now.getDate() - 1);
    }
    lastWeek.reverse();
    lastWeek.forEach((date) => {
      this.chartData?.labels?.push(date);
    });
  }
}
