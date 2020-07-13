import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';
import { AdminInvoicesDetailComponent } from './admin-invoices-detail/admin-invoices-detail.component';

const routes: Routes = [
  { path: '', component: AdminInvoicesListComponent },
  { path: 'list', component: AdminInvoicesListComponent },
  { path: 'detail/:id', component: AdminInvoicesDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminInvoicesRoutingModule { }
