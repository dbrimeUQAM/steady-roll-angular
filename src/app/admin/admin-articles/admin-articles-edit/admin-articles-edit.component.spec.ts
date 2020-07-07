import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminArticlesEditComponent } from './admin-articles-edit.component';

describe('AdminArticlesEditComponent', () => {
  let component: AdminArticlesEditComponent;
  let fixture: ComponentFixture<AdminArticlesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminArticlesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminArticlesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
