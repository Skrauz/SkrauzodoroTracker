import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Timespan } from 'src/app/database/timespanModel';
import { TimespansService } from 'src/app/database/timespans.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss', './../../shared/shared-inputs.scss'],
})
export class TrackerComponent implements OnDestroy {
  constructor(
    private timespanService: TimespansService,
    private titleService: Title
  ) {
    this.refreshTimer();
  }

  ngOnDestroy() {
    this.titleService.setTitle('Skrauzodoro Timer');
  }

  taskName = '';
  projectName = '';

  projects = ['project1', 'project2', 'project3'];
  // placeholder projects

  timeString = '';
  timerOn = false;
  seconds = 0;
  startTime: Date = new Date();
  clockInterval?: NodeJS.Timer;

  refreshTimer() {
    this.refreshTimeString(0);
    this.seconds = 0;
  }

  refreshTimeString(seconds: number) {
    this.timeString = new Date(seconds * 1000).toISOString().slice(11, 19);
    this.titleService.setTitle(`${this.timeString} - Skrauzodoro Tracker`);
  }

  startTracker() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.startTime = new Date();
      this.clockInterval = setInterval(() => {
        this.seconds++;
        this.refreshTimeString(this.seconds);
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
      this.refreshTimer();
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
