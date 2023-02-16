import { Component } from '@angular/core';
import { SettingsModalComponent } from '../modal-windows/settings/settings-modal.component';
import { IntegrationsModalComponent } from '../modal-windows/integrations/integrations-modal.component';
import { ProjectsModalComponent } from '../modal-windows/projects/projects-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  settingsModalRef?: MdbModalRef<SettingsModalComponent> | null = null;
  integrationsModalRef?: MdbModalRef<IntegrationsModalComponent> | null = null;
  projectsModalRef?: MdbModalRef<ProjectsModalComponent> | null = null;

  constructor(private modalService: MdbModalService) {}

  openSettingsModal() {
    this.settingsModalRef = this.modalService.open(SettingsModalComponent);
  }

  openIntegrationsModal() {
    this.integrationsModalRef = this.modalService.open(IntegrationsModalComponent);
  }

  openProjectsModal() {
    this.projectsModalRef = this.modalService.open(ProjectsModalComponent);
  }
}
