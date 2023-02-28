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
  }

  timespans$: Observable<Timespan[]> = new Observable();

  refreshTimespans() {
    this.timespans$ = this.timespansService.getTimespans();
  }

  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;

  //

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      // {
      //   data: [ 180, 480, 770, 90, 1000, 270, 400 ],
      //   label: 'Series C',
      //   yAxisID: 'y1',
      //   backgroundColor: 'rgba(255,0,0,0.3)',
      //   borderColor: 'red',
      //   pointBackgroundColor: 'rgba(148,159,177,1)',
      //   pointBorderColor: '#fff',
      //   pointHoverBackgroundColor: '#fff',
      //   pointHoverBorderColor: 'rgba(148,159,177,0.8)',
      //   fill: 'origin',
      // }
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      y: {
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
      },
    },
  };

  public chartType: ChartType = 'bar';

  @ViewChild(BaseChartDirective) mainChart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] =
          AnalyticsMainComponent.generateNumber(i);
      }
    }
    this.mainChart?.update();
  }

  // events
  // public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  // public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
  //   console.log(event, active);
  // }

  public hideOne(): void {
    const isHidden = this.mainChart?.isDatasetHidden(1);
    this.mainChart?.hideDataset(1, !isHidden);
  }

  pushOne(): void {
    // this.lineChartData.datasets.forEach((x, i) => {
    //   const num = AnalyticsMainComponent.generateNumber(i);
    //   x.data.push(num);
    // });
    this.lineChartData?.labels?.push(
      `Label ${this.lineChartData.labels.length}`
    );

    this.mainChart?.update();
  }

  applyDateRange() {
    if (this.startDate && this.endDate && this.endDate >= this.startDate) {
      let startDate = new Date(this.startDate);
      let endDate = new Date(this.endDate);
      let timePeriod: string[] = [];
      let currentdate = new Date(endDate);
      do {
        timePeriod.push(formatDateEnGB(currentdate));
        currentdate.setDate(currentdate.getDate() - 1);
      } while (formatDateEnGB(currentdate) >= formatDateEnGB(startDate));
      timePeriod.reverse();
      console.log(timePeriod);
      this.applyLabelRange(timePeriod);
    }
  }

  applyLabelRange(input?: string[]): void {
    this.lineChartData?.labels?.splice(0, this.lineChartData?.labels?.length);

    if (!input) {
      // Generate latest week and push to the labels
      let lastWeek: string[] = [];
      let now = new Date();
      for (let i = 0; i < 7; i++) {
        lastWeek.push(formatDateEnGB(now));
        now.setDate(now.getDate() - 1);
      }
      lastWeek.reverse();
      lastWeek.forEach((date) => {
        this.lineChartData?.labels?.push(date);
      });
      return;
    }

    input.forEach((label) => {
      this.lineChartData?.labels?.push(label);
    });

    this.mainChart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.mainChart?.update();
  }
}
