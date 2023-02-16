import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-modal.component.html',
  styleUrls: ['./projects-modal.component.scss', "./../../pages/shared/shared-inputs.scss", './../../pages/shared/shared-modal.scss']
})
export class ProjectsModalComponent {
  constructor(public modalRef: MdbModalRef<ProjectsModalComponent>) {}
}
