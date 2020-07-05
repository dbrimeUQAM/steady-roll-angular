import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsDeleteComponent } from './admin-hospitals-delete.component';

describe('AdminHospitalsDeleteComponent', () => {
  let component: AdminHospitalsDeleteComponent;
  let fixture: ComponentFixture<AdminHospitalsDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalsDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
