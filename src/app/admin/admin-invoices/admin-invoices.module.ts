import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminInvoicesRoutingModule } from './admin-invoices-routing.module';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';
import { AdminInvoicesDetailComponent } from './admin-invoices-detail/admin-invoices-detail.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminInvoicesRoutingModule
  ],
  declarations: [
    AdminInvoicesDetailComponent,
    AdminInvoicesListComponent
  ],
  exports: [
    AdminInvoicesRoutingModule
  ]
})
export class AdminInvoicesModule { }
