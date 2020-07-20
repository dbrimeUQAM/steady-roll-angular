import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';

const routes: Routes = [
  { path: '', component: AdminInvoicesListComponent },
  { path: 'list', component: AdminInvoicesListComponent }
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
