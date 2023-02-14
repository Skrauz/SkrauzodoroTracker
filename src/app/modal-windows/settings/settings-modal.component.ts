import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SettingsService } from 'src/app/settings-service/settings.service';
import { SoundService } from 'src/app/sound-service/sound.service';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: [
    './../../pages/shared/shared-inputs.scss',
    './settings-modal.component.scss',
    './../../pages/shared/shared-modal.scss',
  ],
})
export class SettingsModalComponent {
  constructor(
    public modalRef: MdbModalRef<SettingsModalComponent>,
    public settingsService: SettingsService,
    public soundService: SoundService
  ) {}

  testSound() {
    if(this.settingsService.settings.alarmSound) {
      const testSound = new Audio(
        this.getAlarmSrc(this.settingsService.settings.alarmSound)
      )
      testSound.play();
    }
  }

  getAlarmSrc(alarm: string): string {
    switch(alarm) {
      case '1': return './../../assets/sound/bell1.wav';
      case '2': return './../../assets/sound/bell2.wav';
      case '3': return './../../assets/sound/bell3.wav';
      case '4': return './../../assets/sound/bell4.wav';
      default: return './../../assets/sound/bell1.wav';
    }
  }

  saveSettings() {
    if (this.settingsService.validateForm()) {
      localStorage.setItem(
        'pomoLength',
        String(this.settingsService.settings.pomoLength)
      );
      localStorage.setItem(
        'shortBreakLength',
        String(this.settingsService.settings.shortBreakLength)
      );
      localStorage.setItem(
        'longBreakLength',
        String(this.settingsService.settings.longBreakLength)
      );
      localStorage.setItem(
        'pomosUntilLongBreak',
        String(this.settingsService.settings.pomosUntilLongBreak)
      );
      localStorage.setItem(
        'autoplay',
        JSON.stringify(this.settingsService.settings.pomodoroAutoplay)
      );
      localStorage.setItem(
        'alarmSound',
        this.settingsService.settings.alarmSound
      )
    }
  }

  restoreDefaultSettings() {
    this.settingsService.settings.pomoLength = 25;
    this.settingsService.settings.shortBreakLength = 5;
    this.settingsService.settings.longBreakLength = 10;
    this.settingsService.settings.pomosUntilLongBreak = 4;
    this.settingsService.settings.pomodoroAutoplay = false;
    this.settingsService.settings.alarmSound = '1';
  }
}
