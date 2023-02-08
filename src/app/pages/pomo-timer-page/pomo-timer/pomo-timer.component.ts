import { Component } from '@angular/core';
import { Timespan } from 'src/app/database/timespanModel';
import { TimespansService } from 'src/app/database/timespans.service';
import { TitleService } from 'src/app/title-service/title.service';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: [
    './pomo-timer.component.scss',
    './../../shared/shared-inputs.scss',
  ],
})
export class PomoTimerComponent {
  constructor(private timespanService: TimespansService, private titleService: TitleService) {
    this.currentSetting = 'focusSession';
    this.refreshTimer(this.currentSetting);
  }

  timeString: string = '';

  taskName = '';
  projectName = '';
  projects = ['project1', 'project2', 'project3'];
  // placeholder projects, fetch them from the database later

  pomoLengthSeconds = 1500;
  shortBreakSeconds = 300;
  longBreakSeconds = 600;
  pomosTillLongBreak = 4;
  autoplay = true;
  // Load settings from local storage later

  currentSetting: 'focusSession' | 'shortBreak' | 'longBreak';

  timerOn = false;
  seconds = 0;
  pomoStreak = 0;
  startTime: Date = new Date();
  clockInterval?: NodeJS.Timer;

  setSetting(setting: 'focusSession' | 'shortBreak' | 'longBreak') {
    this.currentSetting = setting;
    this.manualFinishTimer();
  }

  refreshTimeString(seconds: number) {
    this.timeString = new Date(seconds * 1000).toISOString().slice(14, 19);
    this.titleService.set(this.timeString);
  }

  refreshTimer(setting: string) {
    switch (this.currentSetting) {
      case 'focusSession':
        this.refreshTimeString(this.pomoLengthSeconds);
        this.seconds = this.pomoLengthSeconds;
        break;
      case 'longBreak':
        this.refreshTimeString(this.longBreakSeconds);
        this.seconds = this.longBreakSeconds;
        break;
      case 'shortBreak':
        this.refreshTimeString(this.shortBreakSeconds);
        this.seconds = this.shortBreakSeconds;
        break;
    }
  }

  startTimer() {
    if (!this.timerOn) {
      this.timerOn = true;
      this.startTime = new Date();
      this.clockInterval = setInterval(() => {
        this.seconds--;
        this.refreshTimeString(this.seconds);
        if (this.seconds + 1 == 0) {
          this.finishTimer();
        }
      }, 1000);
    }
  }
  // Implement sound upon clicking the control buttons

  manualFinishTimer() {
    this.stopTimer();
    this.refreshTimer(this.currentSetting);
  }

  finishTimer() {
    // popup alert the user on the end of the timer

    if(this.currentSetting == 'focusSession') {
      this.pomoStreak++;
    }
    this.stopTimer();
    // switch to the next setting
    this.nextSetting();
    this.refreshTimer(this.currentSetting);
    if (this.autoplay) {
      this.startTimer();
    }
  }

  nextSetting() {
    if (this.currentSetting == 'focusSession') {
      if (this.pomoStreak >= this.pomosTillLongBreak) {
        this.pomoStreak = 0;
        this.currentSetting = 'longBreak';
        return;
      }
      this.currentSetting = 'shortBreak';
      return;
    }
    this.currentSetting = 'focusSession';
  }

  stopTimer() {
    if (this.timerOn) {
      this.timerOn = false;
      if(this.currentSetting == 'focusSession') {
        // Add record to the database
        const timespan = this.constructTimespan();
        // console.log(timespan);
        this.timespanService.createTimespan(timespan);
      }
      clearInterval(this.clockInterval);
    }
  }

  constructTimespan(): Timespan {
    let timespan: Timespan = {
      name: 'Unnamed Task',
      project: 'Unnamed Project',
      mode: 'pomodoro',
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
