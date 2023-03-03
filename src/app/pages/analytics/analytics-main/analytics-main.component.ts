import { Component, OnInit, ViewChild, Injectable } from '@angular/core';
import { ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Observable } from 'rxjs';
import { Timespan } from 'src/app/database/timespans/timespanModel';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { formatDateEnGB } from './formatDate';
import { constructDatasets } from './constructDatasets';
import { convertMinsToHrsMins } from './minutesConverter';

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
    this.applyLabelRange();
    this.refreshTimespans();
    this.refreshChart();
    this.timespans$.subscribe((timespans) => {
      let timespanProjects: string[] = [];
      timespans.forEach((timespan) => {
        if (timespan.project) {
          timespanProjects.push(timespan.project);
        }
      });

      this.uniqueProjects = [...new Set(timespanProjects)];
    });
  }

  refreshChart(filter?: { name?: string; projectName?: string }) {
    this.chartData.datasets = constructDatasets(
      this.timespans$,
      this.chartData.labels,
      filter
    );
    // todo: use then here later
    this.timespans$.subscribe(() => {
      this.mainChart?.update();
    });
  }

  uniqueProjects?: string[];

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

  filterChart() {
    this.refreshTimespans();
    let filter = { name: this.taskName, projectName: this.projectName };
    this.refreshChart(filter);
  }

  public chartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += convertMinsToHrsMins(context.parsed.y);
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: 'Time spent on tasks in the last week',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Minutes',
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
