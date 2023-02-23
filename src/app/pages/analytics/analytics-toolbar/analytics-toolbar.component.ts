import { Component } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics-toolbar',
  templateUrl: './analytics-toolbar.component.html',
  styleUrls: ['./analytics-toolbar.component.scss']
})
export class AnalyticsToolbarComponent {
  constructor(public analyticsService: AnalyticsService) {

  }
}
