import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { SettingsService } from 'src/app/settings-service/settings.service';

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
    public settingsService: SettingsService
  ) {}

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
    }
  }

  restoreDefaultSettings() {
    this.settingsService.settings.pomoLength = 25;
    this.settingsService.settings.shortBreakLength = 5;
    this.settingsService.settings.longBreakLength = 10;
    this.settingsService.settings.pomosUntilLongBreak = 4;
    this.settingsService.settings.pomodoroAutoplay = false;
  }
}
