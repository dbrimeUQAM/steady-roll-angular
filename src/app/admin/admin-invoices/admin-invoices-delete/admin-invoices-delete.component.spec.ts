import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInvoicesDeleteComponent } from './admin-invoices-delete.component';

describe('AdminInvoicesDeleteComponent', () => {
  let component: AdminInvoicesDeleteComponent;
  let fixture: ComponentFixture<AdminInvoicesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInvoicesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInvoicesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
