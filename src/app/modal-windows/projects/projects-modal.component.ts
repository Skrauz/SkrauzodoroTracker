import { Component, OnInit, Injectable } from '@angular/core';
import {
  MdbModalConfig,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { Project } from 'src/app/database/projects/projectModel';
import { Observable } from 'rxjs';

import { EditProjectComponent } from './edit-project/edit-project.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-modal.component.html',
  styleUrls: [
    './projects-modal.component.scss',
    './../../pages/shared/shared-inputs.scss',
    './../../pages/shared/shared-modal.scss',
  ],
})
@Injectable({
  providedIn: 'root'
})
export class ProjectsModalComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<ProjectsModalComponent>,
    private projectsService: ProjectsService,
    private modalService: MdbModalService
  ) {}

  showFinishedProjects?: boolean;

  projects$: Observable<Project[]> = new Observable();

  ngOnInit(): void {
    this.refreshProjects();
  }

  editProjectModalRef?: MdbModalRef<EditProjectComponent> | null = null;

  refreshProjects() {
    this.projects$ = this.projectsService.getProjects();
  }

  openEditProject(name$: string) {
    this.editProjectModalRef = this.modalService.open(EditProjectComponent, {
      data: { name: name$ },
    });
  }

  deleteProject(id: string) {
    const response = this.projectsService.deleteProject(id);
    response.subscribe({
      next: () => {
        this.refreshProjects();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to delete the project')
      },
    });
  }
}
