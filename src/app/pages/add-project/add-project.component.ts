import { Component } from '@angular/core';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss', './../shared-mat-card.scss'],
})
export class AddProjectComponent {
  newProjectName = '';

  submitNewProject() {
    // add a popup window saying the project already exists if user enters the name of existing project
  }
}
