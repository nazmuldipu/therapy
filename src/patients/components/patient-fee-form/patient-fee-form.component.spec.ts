import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientFeeFormComponent } from './patient-fee-form.component';

describe('PatientFeeFormComponent', () => {
  let component: PatientFeeFormComponent;
  let fixture: ComponentFixture<PatientFeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientFeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientFeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
