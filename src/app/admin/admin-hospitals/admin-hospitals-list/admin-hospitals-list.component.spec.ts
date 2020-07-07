import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsListComponent } from './admin-hospitals-list.component';

describe('AdminHospitalsListComponent', () => {
  let component: AdminHospitalsListComponent;
  let fixture: ComponentFixture<AdminHospitalsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
