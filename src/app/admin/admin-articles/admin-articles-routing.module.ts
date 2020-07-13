import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminArticlesListComponent } from './admin-articles-list/admin-articles-list.component';
import { AdminArticlesDetailComponent } from './admin-articles-detail/admin-articles-detail.component';

const routes: Routes = [
  { path: '', component: AdminArticlesListComponent },
  { path: 'list', component: AdminArticlesListComponent },
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
