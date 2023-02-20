import { Injectable } from '@angular/core';
import { Project } from './projectModel';
import { Observable, Subject } from 'rxjs'
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  constructor(private httpClient: HttpClient) { }

  private url = "http://localhost:5050/api/projects";

  private projects$: Subject<Project[]> = new Subject();
  private projects: Project[] = [];

  // Read
  getProjects(): Subject<Project[]> {
    this.httpClient.get<Project[]>(this.url)
    .subscribe((projects) => {
      this.projects = projects;
      this.projects$.next(projects);
    })
    return this.projects$;
  }

  getProject(projectName: string): Subject<Project> {
    let project$: Subject<Project> = new Subject();
    this.httpClient.get<Project>(`${this.url}/${projectName}`).subscribe((project) => {
      project$.next(project);
    });
    return project$;
  }

  // Create
  createProject(project: Project): Observable<string> {
    if(this.hasDuplicates(project)) {
      alert("Project names must be unique");
      return new Observable();
    }
    let response = this.httpClient.post(this.url , project, {responseType: "text"});
    response
    .subscribe({
      next: () => {
        console.log('project saved successfuly');
      },
      error: (err) => {
        alert('Failed to create a project');
        console.error(err);
      },
    });
    return response;
  }

  hasDuplicates(project: Project): boolean {
    let duplicates: boolean = false;
    this.projects.forEach((pr) => {
      if(pr.name == project.name) {
        alert("Project names must be unique");
        duplicates = true;
        return;
      }
    })
    return duplicates;
  }

  // Update
  updateProject(project: Project): Observable<string> {
    let response = this.httpClient.put(`${this.url}/${project._id}`, project, {responseType: "text"});
    response.subscribe({
      next: (res) => {
        // console.log(res);
      },
      error: (err) => {
        console.error(err);
        alert("Failed to update the project");
      }
    });
    return response;
  }
}
