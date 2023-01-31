import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { PomoTimerPageComponent } from './pages/pomo-timer-page/pomo-timer-page.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { IntegrationsComponent } from './pages/integrations/integrations.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracker', pathMatch: 'full' },
  { path: 'tracker', component: TrackerPageComponent },
  { path: 'timer', component: PomoTimerPageComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'integrations', component: IntegrationsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
