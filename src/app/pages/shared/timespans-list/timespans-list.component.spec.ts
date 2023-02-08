import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimespansListComponent } from './timespans-list.component';

describe('TimespansListComponent', () => {
  let component: TimespansListComponent;
  let fixture: ComponentFixture<TimespansListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimespansListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimespansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
