import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsModalComponent } from './projects-modal.component';

describe('ProjectsComponent', () => {
  let component: ProjectsModalComponent;
  let fixture: ComponentFixture<ProjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
