import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';
import { AdminInvoicesDeleteComponent } from './admin-invoices-delete/admin-invoices-delete.component';
import { AdminInvoicesDetailComponent } from './admin-invoices-detail/admin-invoices-detail.component';
import { AdminInvoicesEditComponent } from './admin-invoices-edit/admin-invoices-edit.component';
import { AdminInvoicesAddComponent } from './admin-invoices-add/admin-invoices-add.component';

const routes: Routes = [
  { path: '', component: AdminInvoicesListComponent },
  { path: 'list', component: AdminInvoicesListComponent },
  { path: 'add', component: AdminInvoicesAddComponent },
  { path: 'delete', component: AdminInvoicesDeleteComponent },
  { path: 'edit', component: AdminInvoicesEditComponent },
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
