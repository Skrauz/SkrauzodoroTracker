import { Component } from '@angular/core';
import { AnalyticsMainComponent } from '../analytics-main/analytics-main.component';

@Component({
  selector: 'app-analytics-toolbar',
  templateUrl: './analytics-toolbar.component.html',
  styleUrls: ['./analytics-toolbar.component.scss'],
})
export class AnalyticsToolbarComponent {
  constructor(private analyticsMain: AnalyticsMainComponent) {}

  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;

  applyLabelRange() {
    if (this.startDate && this.endDate) {
      this.analyticsMain.chartData.labels = ['g','h'];
      this.analyticsMain.chartMain?.update();
      return;
    }
  }
}
