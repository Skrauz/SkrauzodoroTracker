import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTimerComponent } from './pomo-timer.component';

describe('PomoTimerComponent', () => {
  let component: PomoTimerComponent;
  let fixture: ComponentFixture<PomoTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomoTimerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
