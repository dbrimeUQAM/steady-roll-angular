import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesAddComponent } from './admin-invoices-add.component';

describe('AdminInvoicesAddComponent', () => {
  let component: AdminInvoicesAddComponent;
  let fixture: ComponentFixture<AdminInvoicesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInvoicesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
