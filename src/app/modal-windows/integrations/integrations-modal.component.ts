import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-integrations-modal',
  templateUrl: './integrations-modal.component.html',
  styleUrls: ['./integrations-modal.component.scss', "./../../pages/shared/shared-inputs.scss", './../../pages/shared/shared-modal.scss']
})
export class IntegrationsModalComponent {
  constructor(public modalRef: MdbModalRef<IntegrationsModalComponent>) {}
}
