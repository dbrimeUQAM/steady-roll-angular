import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminOrdersRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersDetailComponent } from './admin-orders-detail/admin-orders-detail.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminOrdersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MomentModule.forRoot()
  ],
  declarations: [
    AdminOrdersDetailComponent,
    AdminOrdersListComponent
  ],
  exports: [
    AdminOrdersRoutingModule
  ]
})
export class AdminOrdersModule { }
