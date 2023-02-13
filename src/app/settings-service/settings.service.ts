import { Injectable } from '@angular/core';
import { Settings } from './settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor() {
    this.settings = {
      pomoLength: parseInt(this.getSetting('pomoLength')),
      shortBreakLength: parseInt(this.getSetting('shortBreakLength')),
      longBreakLength: parseInt(this.getSetting('LongBreakLength')),
      pomosUntilLongBreak: parseInt(this.getSetting('pomosUntilLongBreak')),
      pomodoroAutoplay: JSON.parse(this.getSetting('autoplay')),
    };
  }

  settings: Settings;

  getSetting(
    setting: 'pomoLength' | 'shortBreakLength' | 'LongBreakLength' | 'autoplay' | 'pomosUntilLongBreak'
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
      case 'pomosUntilLongBreak':
        localStorage.setItem('pomosUntilLongBreak', '4');
        return '4';
      case 'autoplay':
        localStorage.setItem('autoplay', 'false');
        return 'false';
    }
  }

  validateForm(): boolean {
    if (
      this.settings.pomoLength > 0 &&
      this.settings.shortBreakLength > 0 &&
      this.settings.longBreakLength > 0 &&
      this.settings.pomosUntilLongBreak > 0
    )
      return true;
    return false;
  }
}
