import { Component } from '@angular/core';

@Component({
  selector: 'app-tracker',
  template: `
    <mat-card>
      <mat-card-content>
        <div class="timer-string">{{ timeString }}</div>
        <div class="input-div">
          <mat-form-field class="input-form-field">
            <mat-label>Task Name</mat-label>
            <input matInput type="text" [(ngModel)]="taskName" />
            <button
              *ngIf="taskName"
              matSuffix
              mat-icon-button
              aria-label="Clear"
              (click)="taskName = ''"
            >
              <mat-icon>close</mat-icon>
            </button>
          </mat-form-field>
          <mat-form-field class="input-form-field">
            <mat-label>Project</mat-label>
            <mat-select [(ngModel)]="projectName">
              <mat-option *ngFor="let project of projects" [value]="project">
                {{ project }}
                <!-- add color codes for the projects here later -->
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>
        <div class="controls">
          <button
            class="control-button"
            mat-raised-button
            color="primary"
            (click)="stopTracker()"
          >
            <i class="fa-solid fa-square"></i>
          </button>
          <button
            class="control-button"
            mat-raised-button
            color="primary"
            [ngClass]="{ pressed: timerOn }"
            (click)="startTracker()"
          >
            <i class="fa-solid fa-play"></i>
          </button>
          <!-- add a class toggle to this button later so that the color and the icon changes -->
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styleUrls: ['./tracker.component.scss', './../../shared-mat-card.scss'],
  // Create some shared stylesheets for the buttons and such
})
export class TrackerComponent {
  taskName = '';
  projectName = '';

  projects = ['project1', 'project2', 'project3'];
  // placeholder projects

  timeString = '00:00:00';
  timerOn = false;
  seconds = 0;

  clockInterval?: NodeJS.Timer;

  startTracker() {
    if (!this.timerOn) {
      this.timerOn = true;
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
      clearInterval(this.clockInterval);
      this.seconds = 0;
      this.timeString = '00:00:00';
    }
  }
}
