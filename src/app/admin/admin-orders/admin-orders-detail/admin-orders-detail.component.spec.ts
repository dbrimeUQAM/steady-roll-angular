import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersDetailComponent } from './admin-orders-detail.component';

describe('AdminOrdersDetailComponent', () => {
  let component: AdminOrdersDetailComponent;
  let fixture: ComponentFixture<AdminOrdersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrdersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrdersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
