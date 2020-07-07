import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesEditComponent } from './admin-invoices-edit.component';

describe('AdminInvoicesEditComponent', () => {
  let component: AdminInvoicesEditComponent;
  let fixture: ComponentFixture<AdminInvoicesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInvoicesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
