import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesDeleteComponent } from './admin-articles-delete.component';

describe('AdminArticlesDeleteComponent', () => {
  let component: AdminArticlesDeleteComponent;
  let fixture: ComponentFixture<AdminArticlesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticlesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticlesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
