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

  playAlarm() {
    const alarm = new Audio();
    alarm.src = this.settingsService.settings.alarmSoundSrc;
    alarm.load();
    alarm.play();
  }
}
