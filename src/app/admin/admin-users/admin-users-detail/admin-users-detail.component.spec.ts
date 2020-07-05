import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersDetailComponent } from './admin-users-detail.component';

describe('AdminUsersDetailComponent', () => {
  let component: AdminUsersDetailComponent;
  let fixture: ComponentFixture<AdminUsersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
