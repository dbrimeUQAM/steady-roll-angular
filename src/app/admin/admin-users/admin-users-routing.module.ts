import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUsersDetailComponent } from './admin-users-detail/admin-users-detail.component';

const routes: Routes = [
  { path: '', component: AdminUsersListComponent },
  { path: 'list', component: AdminUsersListComponent },
  { path: 'detail/:id', component: AdminUsersDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminUsersRoutingModule { }
