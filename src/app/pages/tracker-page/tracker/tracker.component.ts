import { Component } from '@angular/core';
import { Timespan } from 'src/app/database/timespanModel';
import { TimespansService } from 'src/app/database/timespans.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss', './../../shared-mat-card.scss'],
  // Create some shared stylesheets for the buttons and such
})
export class TrackerComponent {
  constructor(private timespanService: TimespansService) {}

  taskName = '';
  projectName = '';

  projects = ['project1', 'project2', 'project3'];
  // placeholder projects

  timeString = '00:00:00';
  timerOn = false;
  seconds = 0;
  startTime: Date = new Date();
  clockInterval?: NodeJS.Timer;

  startTracker() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.startTime = new Date();
      this.clockInterval = setInterval(() => {
        this.seconds++;
        this.timeString = new Date(this.seconds * 1000)
          .toISOString()
          .slice(11, 19);
      }, 1000);
    }
  }

  stopTracker() {
    if (this.timerOn) {
      this.timerOn = false;

      // Add record to the database
      const timespan = this.constructTimespan();
      // console.log(timespan);

      this.timespanService.createTimespan(timespan);
      clearInterval(this.clockInterval);
      this.seconds = 0;
      this.timeString = '00:00:00';
    }
  }

  constructTimespan(): Timespan {
    let timespan: Timespan = {
      name: 'Unnamed Task',
      project: 'Unnamed Project',
      mode: 'tracker',
      startTime: this.startTime,
      endTime: new Date(),
    };
    if (this.taskName) {
      timespan.name = this.taskName;
    }
    if (this.projectName) {
      timespan.project = this.projectName;
    }
    return timespan;
  }
}
