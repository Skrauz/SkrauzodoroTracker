import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { PomoTimerPageComponent } from './pages/pomo-timer-page/pomo-timer-page.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';

const routes: Routes = [
  { path: '', redirectTo: 'tracker', pathMatch: 'full' },
  { path: 'tracker', component: TrackerPageComponent },
  { path: 'timer', component: PomoTimerPageComponent },
  { path: 'analytics', component: AnalyticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
