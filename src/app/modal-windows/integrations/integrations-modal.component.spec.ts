import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsModalComponent } from './integrations-modal.component';

describe('IntegrationsComponent', () => {
  let component: IntegrationsModalComponent;
  let fixture: ComponentFixture<IntegrationsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegrationsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntegrationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
