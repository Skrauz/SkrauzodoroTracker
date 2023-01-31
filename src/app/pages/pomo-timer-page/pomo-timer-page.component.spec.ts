import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoTimerPageComponent } from './pomo-timer-page.component';

describe('PomoTimerComponent', () => {
  let component: PomoTimerPageComponent;
  let fixture: ComponentFixture<PomoTimerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PomoTimerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PomoTimerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
