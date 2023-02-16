import { Injectable } from '@angular/core';
import { Project } from './projectModel';
import { Observable, Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) { }

  private url = "http://localhost:5050/api/projects";

  private projects$: Subject<Project[]> = new Subject();

  // Read
  private refreshProjects() {
    this.httpClient.get<Project[]>(this.url)
    .subscribe((projects) => {
      this.projects$.next(projects)
    })
  }

  getProjects(): Subject<Project[]> {
    this.refreshProjects();
    return this.projects$;
  }

  // Create
  createProject(project: Project): Observable<string> {
    let response = this.httpClient.post(this.url, project, {responseType: "text"});
    response.subscribe({
      next: () => {
        // console.log("Created new project")
      },
      error: (err) => {
        alert('Failed to create a project');
        console.error(err);
      },
    });
    return response;
  }
}
