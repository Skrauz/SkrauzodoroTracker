import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerComponent } from './pages/tracker/tracker.component';
import { PomoTimerComponent } from './pages/pomo-timer/pomo-timer.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { IntegrationsComponent } from './pages/integrations/integrations.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracker', pathMatch: 'full' },
  { path: 'tracker', component: TrackerComponent },
  { path: 'timer', component: PomoTimerComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'integrations', component: IntegrationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
