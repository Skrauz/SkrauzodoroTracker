import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartType, Chart, ChartConfiguration, ChartEvent } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Timespan } from 'src/app/database/timespans/timespanModel';
// import {default as Annotation} from 'chartjs-plugin-annotation';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics-main',
  templateUrl: './analytics-main.component.html',
  styleUrls: ['./analytics-main.component.scss'],
})
export class AnalyticsMainComponent implements OnInit {
  constructor(private timespansService: TimespansService, private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.refreshTimespans();
  }

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartType: ChartType = 'line';

  timespans$: Observable<Timespan[]> = new Observable();

  refreshTimespans() {
    this.timespans$ = this.timespansService.getTimespans();
  }

  public dummyData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [ 65, 59, 80, 81, 56, 55, 40 ],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      } ]
    }

  public chartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      y:
        {
          position: 'left',
        }
    }
  }
}
