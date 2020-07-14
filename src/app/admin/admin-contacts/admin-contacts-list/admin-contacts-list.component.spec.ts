import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactsListComponent } from './admin-contacts-list.component';

describe('AdminContactsListComponent', () => {
  let component: AdminContactsListComponent;
  let fixture: ComponentFixture<AdminContactsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminContactsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
