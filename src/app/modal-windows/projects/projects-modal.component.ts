import { Component, Injectable, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProjectsService } from 'src/app/database/projects/projects.service';
import { Project } from 'src/app/database/projects/projectModel';
import { Observable } from 'rxjs';

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
  providedIn: "root"
})
export class ProjectsModalComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<ProjectsModalComponent>,
    private projectsService: ProjectsService
  ) {}

  projects$: Observable<Project[]> = new Observable();

  ngOnInit(): void {
    this.refreshProjects();
  }

  refreshProjects(): void {
    this.projects$ = this.projectsService.getProjects();
  }
}
