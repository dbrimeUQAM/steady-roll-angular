import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUsersDeleteComponent } from './admin-users-delete/admin-users-delete.component';
import { AdminUsersDetailComponent } from './admin-users-detail/admin-users-detail.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';
import { AdminUsersAddComponent } from './admin-users-add/admin-users-add.component';

const routes: Routes = [
  { path: '', component: AdminUsersListComponent },
  { path: 'list', component: AdminUsersListComponent },
  { path: 'add', component: AdminUsersAddComponent },
  { path: 'delete/:id', component: AdminUsersDeleteComponent },
  { path: 'edit/:id', component: AdminUsersEditComponent },
  { path: 'detail/:id', component: AdminUsersDetailComponent }
];
/*
const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
    children: [
      {
        path: '',
        component: AdminUsersListComponent,
        data:
        {
          title: 'List',
        }
      },
      {
        path: 'list',
        component: AdminUsersListComponent,
        data:
        {
          title: 'List',
        }
      },
      {
        path: 'edit',
        component: AdminUsersEditComponent,
        data:
        {
          title: 'Edit',
        }
      },
      {
        path: 'detail/:id',
        component: AdminUsersDetailComponent,
        data:
        {
          title: 'Detail',
        }
      },
      {
        path: 'delete/:id',
        component: AdminUsersDeleteComponent,
        data:
        {
          title: 'Delete',
        }
      }
    ]
  },
];
*/
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminUsersRoutingModule { }
