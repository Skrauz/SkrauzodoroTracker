import { Component } from '@angular/core';

@Component({
  selector: 'app-info-card',
  template: `
    <div class="card bg-dark">
      <div class="card-body">
        <h5 class="card-title">Info <i class="fa-solid fa-circle-info"></i></h5>
        <p class="card-text">
          <ng-content></ng-content>
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./info-card.component.scss'],
})
export class InfoCardComponent {
  constructor() {}
}
