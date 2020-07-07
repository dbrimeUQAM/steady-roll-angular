import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsEditComponent } from './admin-hospitals-edit.component';

describe('AdminHospitalsEditComponent', () => {
  let component: AdminHospitalsEditComponent;
  let fixture: ComponentFixture<AdminHospitalsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
