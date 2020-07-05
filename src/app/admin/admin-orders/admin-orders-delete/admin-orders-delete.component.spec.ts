import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersDeleteComponent } from './admin-orders-delete.component';

describe('AdminOrdersDeleteComponent', () => {
  let component: AdminOrdersDeleteComponent;
  let fixture: ComponentFixture<AdminOrdersDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
