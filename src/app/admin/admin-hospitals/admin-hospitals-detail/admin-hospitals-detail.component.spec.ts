import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHospitalsDetailComponent } from './admin-hospitals-detail.component';

describe('AdminHospitalsDetailComponent', () => {
  let component: AdminHospitalsDetailComponent;
  let fixture: ComponentFixture<AdminHospitalsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHospitalsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHospitalsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
