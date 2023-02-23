import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  template: `
    <div class="content">
      <div class="card bg-dark">
        <app-analytics-toolbar class="card-header"></app-analytics-toolbar>
        <app-analytics-main class="card-body"></app-analytics-main>
      </div>
    </div>
  `,
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {}
