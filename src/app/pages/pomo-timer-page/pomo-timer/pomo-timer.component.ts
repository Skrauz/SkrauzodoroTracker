import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Timespan } from 'src/app/database/timespans/timespanModel';
import { TimespansService } from 'src/app/database/timespans/timespans.service';
import { SoundService } from 'src/app/sound-service/sound.service';
import { Project } from 'src/app/database/projects/projectModel';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { SettingsService } from 'src/app/settings-service/settings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pomo-timer',
  templateUrl: './pomo-timer.component.html',
  styleUrls: [
    './pomo-timer.component.scss',
    './../../shared/shared-inputs.scss',
  ],
})
export class PomoTimerComponent implements OnDestroy {
  constructor(
    private timespanService: TimespansService,
    private titleService: Title,
    private settingsService: SettingsService,
    public soundService: SoundService,
    private projectsService: ProjectsService
  ) {
    this.currentSetting = 'focusSession';
    this.refreshTimer(this.currentSetting);
  }

  ngOnDestroy() {
    this.titleService.setTitle('Skrauzodoro Timer');
    if (this.timerOn) {
      this.stopTimer();
    }
  }

  ngOnInit(): void {
    this.refreshProjects();
  }

  projects$: Observable<Project[]> = new Observable();

  refreshProjects() {
    this.projects$ = this.projectsService.getProjects();
  }

  timeString: string = '';

  taskName = '';
  projectName = '';

  pomoLengthSeconds = this.settingsService.settings.pomoLength * 60;
  shortBreakSeconds = this.settingsService.settings.shortBreakLength * 60;
  longBreakSeconds = this.settingsService.settings.longBreakLength * 60;
  pomosTillLongBreak = this.settingsService.settings.pomosUntilLongBreak;
  autoplay = this.settingsService.settings.pomodoroAutoplay;

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
    this.titleService.setTitle(`${this.timeString} - Skrauzodoro Tracker`);
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

  manualFinishTimer() {
    this.stopTimer();
    this.refreshTimer(this.currentSetting);
  }

  finishTimer() {
    // popup alert the user on the end of the timer

    if (this.currentSetting == 'focusSession') {
      this.pomoStreak++;
    }
    this.stopTimer();
    this.soundService.playAlarm();
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
      if (this.currentSetting == 'focusSession') {
        // Add record to the database
        const timespan = this.constructTimespan();
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
