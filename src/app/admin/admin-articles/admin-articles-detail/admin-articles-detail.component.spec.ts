import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesDetailComponent } from './admin-articles-detail.component';

describe('AdminArticlesDetailComponent', () => {
  let component: AdminArticlesDetailComponent;
  let fixture: ComponentFixture<AdminArticlesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticlesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticlesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
