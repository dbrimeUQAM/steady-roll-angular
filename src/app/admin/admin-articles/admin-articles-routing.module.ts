import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminArticlesListComponent } from './admin-articles-list/admin-articles-list.component';
import { AdminArticlesDeleteComponent } from './admin-articles-delete/admin-articles-delete.component';
import { AdminArticlesDetailComponent } from './admin-articles-detail/admin-articles-detail.component';
import { AdminArticlesEditComponent } from './admin-articles-edit/admin-articles-edit.component';
import { AdminArticlesAddComponent } from './admin-articles-add/admin-articles-add.component';

const routes: Routes = [
  { path: '', component: AdminArticlesListComponent },
  { path: 'list', component: AdminArticlesListComponent },
  { path: 'add', component: AdminArticlesAddComponent },
  { path: 'delete', component: AdminArticlesDeleteComponent },
  { path: 'edit', component: AdminArticlesEditComponent },
  { path: 'detail/:id', component: AdminArticlesDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminArticlesRoutingModule { }
