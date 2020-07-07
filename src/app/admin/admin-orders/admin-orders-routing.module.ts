import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersDeleteComponent } from './admin-orders-delete/admin-orders-delete.component';
import { AdminOrdersDetailComponent } from './admin-orders-detail/admin-orders-detail.component';
import { AdminOrdersEditComponent } from './admin-orders-edit/admin-orders-edit.component';
import { AdminOrdersAddComponent } from './admin-orders-add/admin-orders-add.component';

const routes: Routes = [
  { path: '', component: AdminOrdersListComponent },
  { path: 'list', component: AdminOrdersListComponent },
  { path: 'add', component: AdminOrdersAddComponent },
  { path: 'delete', component: AdminOrdersDeleteComponent },
  { path: 'edit', component: AdminOrdersEditComponent },
  { path: 'detail/:id', component: AdminOrdersDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminOrdersRoutingModule { }
