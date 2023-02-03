import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

import { ToolbarComponent } from './toolbar-content/toolbar.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { PomoTimerPageComponent } from './pages/pomo-timer-page/pomo-timer-page.component';
import { TimespansListComponent } from './pages/timespans-list/timespans-list.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { IntegrationsComponent } from './pages/integrations/integrations.component';
import { FooterComponent } from './footer/footer.component';
import { TrackerComponent } from './pages/tracker-page/tracker/tracker.component';
import { AddProjectComponent } from './pages/add-project/add-project.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TrackerPageComponent,
    PomoTimerPageComponent,
    TimespansListComponent,
    StatisticsComponent,
    SettingsComponent,
    IntegrationsComponent,
    FooterComponent,
    TrackerComponent,
    AddProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatDividerModule,
    MatSelectModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
