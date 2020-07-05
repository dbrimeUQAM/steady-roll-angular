import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminInvoicesRoutingModule } from './admin-invoices-routing.module';

import { AdminInvoicesComponent } from './admin-invoices.component';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';
import { AdminInvoicesDeleteComponent } from './admin-invoices-delete/admin-invoices-delete.component';
import { AdminInvoicesDetailComponent } from './admin-invoices-detail/admin-invoices-detail.component';
import { AdminInvoicesEditComponent } from './admin-invoices-edit/admin-invoices-edit.component';
import { AdminInvoicesAddComponent } from './admin-invoices-add/admin-invoices-add.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminInvoicesRoutingModule
  ],
  declarations: [
    AdminInvoicesComponent,
    AdminInvoicesDeleteComponent,
    AdminInvoicesDetailComponent,
    AdminInvoicesEditComponent,
    AdminInvoicesListComponent,
    AdminInvoicesAddComponent
  ],
  exports: [
    AdminInvoicesRoutingModule
  ]
})
export class AdminInvoicesModule { }
