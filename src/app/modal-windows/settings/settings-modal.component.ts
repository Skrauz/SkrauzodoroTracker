import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Settings } from './settings';

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
  constructor(public modalRef: MdbModalRef<SettingsModalComponent>) {
    this.settings = {
      pomoLength: parseInt(this.getSetting('pomoLength')),
      shortBreakLength: parseInt(this.getSetting('shortBreakLength')),
      longBreakLength: parseInt(this.getSetting('LongBreakLength')),
      pomodoroAutoplay: JSON.parse(this.getSetting('autoplay'))
    };
  }

  getSetting(
    setting: 'pomoLength' | 'shortBreakLength' | 'LongBreakLength' | 'autoplay'
  ): string {
    if (localStorage.getItem(setting)) {
      return localStorage.getItem(setting)!;
    }
    switch (setting) {
      case 'pomoLength':
        localStorage.setItem('pomoLength', '25');
        return '25';
      case 'shortBreakLength':
        localStorage.setItem('shortBreakLength', '5');
        return '5';
      case 'LongBreakLength':
        localStorage.setItem('longBreakLength', '10');
        return '10';
      case 'autoplay':
        localStorage.setItem('autoplay', 'false');
        return 'false';
    }
  }

  settings: Settings;

  validateForm(): boolean {
    if (
      this.settings.pomoLength > 0 &&
      this.settings.shortBreakLength > 0 &&
      this.settings.longBreakLength > 0
    )
      return true;
    return false;
  }

  saveSettings() {
    if (this.validateForm()) {
      localStorage.setItem('pomoLength', String(this.settings.pomoLength));
      localStorage.setItem(
        'shortBreakLength',
        String(this.settings.shortBreakLength)
      );
      localStorage.setItem(
        'longBreakLength',
        String(this.settings.longBreakLength)
      );
      localStorage.setItem('autoplay', JSON.stringify(this.settings.pomodoroAutoplay));
    }
  }

  restoreDefaultSettings() {
    this.settings.pomoLength = 25;
    this.settings.shortBreakLength = 5;
    this.settings.longBreakLength = 10;
    this.settings.pomodoroAutoplay = false;
  }
}
