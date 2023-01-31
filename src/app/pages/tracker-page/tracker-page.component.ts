import { Component } from '@angular/core';

import { TimespansListComponent } from '../timespans-list/timespans-list.component';

@Component({
  selector: 'app-tracker-page',
  templateUrl: './tracker-page.component.html',
  styleUrls: ['./tracker-page.component.scss']
})
export class TrackerPageComponent {
  taskName = '';
  projectName = '';
  timeString = '00:00:00';
}
