import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarContentComponent } from './toolbar-content/toolbar-content.component';
import { MatButtonModule } from '@angular/material/button';

import { TrackerComponent } from './pages/tracker/tracker.component';
import { PomoTimerComponent } from './pages/pomo-timer/pomo-timer.component';
import { TimespansListComponent } from './pages/timespans-list/timespans-list.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { IntegrationsComponent } from './pages/integrations/integrations.component';

@NgModule({
  declarations: [AppComponent, ToolbarContentComponent, TrackerComponent, PomoTimerComponent, TimespansListComponent, StatisticsComponent, SettingsComponent, IntegrationsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
