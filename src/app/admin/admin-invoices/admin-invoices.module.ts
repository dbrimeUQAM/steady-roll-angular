import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminInvoicesRoutingModule } from './admin-invoices-routing.module';

import { AdminInvoicesListComponent } from './admin-invoices-list/admin-invoices-list.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminInvoicesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MomentModule.forRoot()
  ],
  declarations: [
    AdminInvoicesListComponent
  ],
  exports: [
    AdminInvoicesRoutingModule
  ]
})
export class AdminInvoicesModule { }
