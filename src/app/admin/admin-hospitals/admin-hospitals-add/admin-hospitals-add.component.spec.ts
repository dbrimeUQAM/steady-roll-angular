import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsAddComponent } from './admin-hospitals-add.component';

describe('AdminHospitalsAddComponent', () => {
  let component: AdminHospitalsAddComponent;
  let fixture: ComponentFixture<AdminHospitalsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
