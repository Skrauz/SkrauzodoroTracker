import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics-toolbar',
  templateUrl: './analytics-toolbar.component.html',
  styleUrls: ['./analytics-toolbar.component.scss']
})
export class AnalyticsToolbarComponent {
  taskName?: string;
  projectName?: string;
  startDate?: Date;
  endDate?: Date;
}
