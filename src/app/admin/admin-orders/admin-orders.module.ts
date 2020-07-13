import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminOrdersRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersDetailComponent } from './admin-orders-detail/admin-orders-detail.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminOrdersRoutingModule
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
