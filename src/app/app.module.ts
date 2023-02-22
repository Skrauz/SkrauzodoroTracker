import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ToolbarComponent } from './toolbar-content/toolbar.component';
import { TrackerPageComponent } from './pages/tracker-page/tracker-page.component';
import { PomoTimerPageComponent } from './pages/pomo-timer-page/pomo-timer-page.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { FooterComponent } from './footer/footer.component';
import { TrackerComponent } from './pages/tracker-page/tracker/tracker.component';
import { MatSelectModule } from '@angular/material/select';
import { PomoTimerComponent } from './pages/pomo-timer-page/pomo-timer/pomo-timer.component';
import { InfoCardComponent } from './pages/shared/info-card/info-card.component';

import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { SettingsModalComponent } from './modal-windows/settings/settings-modal.component';
import { IntegrationsModalComponent } from './modal-windows/integrations/integrations-modal.component';
import { ProjectsModalComponent } from './modal-windows/projects/projects-modal.component';
import { AddProjectComponent } from './modal-windows/projects/add-project/add-project.component';
import { EditProjectComponent } from './modal-windows/projects/edit-project/edit-project.component';
import { AnalyticsToolbarComponent } from './pages/analytics/analytics-toolbar/analytics-toolbar.component';
import { AnalyticsMainComponent } from './pages/analytics/analytics-main/analytics-main.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TrackerPageComponent,
    PomoTimerPageComponent,
    AnalyticsComponent,
    FooterComponent,
    TrackerComponent,
    PomoTimerComponent,
    InfoCardComponent,
    SettingsModalComponent,
    IntegrationsModalComponent,
    ProjectsModalComponent,
    AddProjectComponent,
    EditProjectComponent,
    AnalyticsToolbarComponent,
    AnalyticsMainComponent,
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
    LayoutModule,
    MdbModalModule,
    MdbFormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ProjectsModalComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
