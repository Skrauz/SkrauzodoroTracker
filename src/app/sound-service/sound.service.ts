import { Injectable } from '@angular/core';
import { SettingsService } from '../settings-service/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  constructor(private settingsService: SettingsService) { }
  click = new Audio('./../../assets/sound/click.mp3');

  playClick() {
    this.click.play();
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

  playAlarm() {
    const alarm = new Audio();
    alarm.src = this.getAlarmSrc(this.settingsService.settings.alarmSound);
    alarm.load();
    alarm.play();
  }
}
