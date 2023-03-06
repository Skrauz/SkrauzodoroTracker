import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TodoistApi } from '@doist/todoist-api-typescript';
import { getCookie, setCookie } from 'typescript-cookie';
import { ProjectsService } from 'src/app/database/projects/projects.service';

@Component({
  selector: 'app-integrations-modal',
  templateUrl: './integrations-modal.component.html',
  styleUrls: [
    './../../pages/shared/shared-inputs.scss',
    './../../pages/shared/shared-modal.scss',
    './integrations-modal.component.scss',
  ],
})
export class IntegrationsModalComponent implements OnInit {
  constructor(
    public modalRef: MdbModalRef<IntegrationsModalComponent>,
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    if (getCookie('TodoistAPIToken')) {
      this.todoistToken = getCookie('TodoistAPIToken');
      this.constructApi(this.todoistToken)
    }
  }

  saveTokenToCookies() {
    setCookie('TodoistAPIToken', this.todoistToken, {
      secure: true,
      sameSite: 'Strict',
    });
  }

  todoistToken?: string;
  tokenValid: boolean = false;

  todoistApi?: TodoistApi;

  constructApi(todoistToken?: string) {
    if (todoistToken) {
      this.todoistApi = new TodoistApi(todoistToken);
      this.tokenValid = this.testToken(this.todoistApi);
    } else {
      alert('Insert your API Token');
    }
  }

  testToken(todoistApi: TodoistApi): boolean {
    todoistApi.getProjects().catch((error) => {
      alert(error);
      return false;
    });
    return true;
  }

  importProjects() {
    if (this.todoistApi) {
      this.todoistApi
        .getProjects()
        .then((projects) => {
          projects.forEach((project) => {
            let respone = this.projectsService.createProject({
              name: project.name,
            });
            respone.subscribe(
              (respone) => {
                // console.log(respone);
              }
            );
          });
        })
        .catch((error) => console.log(error));
    }
  }
}
