import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerPageComponent } from './tracker-page.component';

describe('TrackerComponent', () => {
  let component: TrackerPageComponent;
  let fixture: ComponentFixture<TrackerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
