import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersDetailComponent } from './admin-orders-detail/admin-orders-detail.component';

const routes: Routes = [
  { path: '', component: AdminOrdersListComponent },
  { path: 'list', component: AdminOrdersListComponent },
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
