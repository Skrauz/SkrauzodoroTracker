import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Timespan } from 'src/app/database/timespans/timespanModel';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { SoundService } from 'src/app/sound-service/sound.service';
import { Project } from 'src/app/database/projects/projectModel';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss', './../../shared/shared-inputs.scss'],
})
export class TrackerComponent implements OnDestroy, OnInit {
  constructor(
    private timespanService: TimespansService,
    private titleService: Title,
    public soundService: SoundService,
    private projectService: ProjectsService
  ) {
    this.refreshTimer();
  }

  ngOnInit(): void {
      this.refreshProjects();
  }

  projects$: Observable<Project[]> = new Observable();

  refreshProjects() {
    this.projects$ = this.projectService.getProjects();
  }

  ngOnDestroy() {
    this.titleService.setTitle('Skrauzodoro Timer');
    if(this.timerOn) {
      this.stopTracker();
    }
  }

  taskName = '';
  projectName = '';

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

      // Construct and add a record to the database
      const timespan = this.constructTimespan();
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
