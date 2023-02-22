import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticsToolbarComponent } from './analytics-toolbar.component';

describe('AnalyticsToolbarComponent', () => {
  let component: AnalyticsToolbarComponent;
  let fixture: ComponentFixture<AnalyticsToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticsToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
