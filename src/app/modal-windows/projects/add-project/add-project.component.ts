import { Component } from '@angular/core';
import { ProjectsService } from 'src/app/database/projects/projects.service';

@Component({
  selector: 'app-add-project',
  template: `
    <div class="input-div">
      <p>Add new project:</p>
      <mdb-form-control>
        <input mdbInput type="text" id="form1" class="form-control" [(ngModel)]="projectName" />
        <label mdbLabel class="form-label" for="form1">Project Name</label>
      </mdb-form-control>
      <button class="btn btn-primary" id="add-button" (click)="addProject()">
        Add Project <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `,
  styleUrls: [
    './../../../pages/shared/shared-inputs.scss',
    './../../../pages/shared/shared-modal.scss',
    './add-project.component.scss',
  ],
})
export class AddProjectComponent {
  constructor(private projectsService: ProjectsService) {}

  projectName: string = '';

  // Todo: Check if project already exists in the database
  addProject() {
    if(!this.projectName) return;
    this.projectName = '';

    const project = {
      name: this.projectName
    }
    this.projectsService.createProject(project);
  }
}
