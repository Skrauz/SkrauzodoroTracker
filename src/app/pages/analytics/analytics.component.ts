import { Component } from '@angular/core';

@Component({
  selector: 'app-analytics',
  template: `
    <div class="content">
      <div class="card bg-dark">
        <app-analytics-main></app-analytics-main>
      </div>
    </div>
  `,
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent {}
