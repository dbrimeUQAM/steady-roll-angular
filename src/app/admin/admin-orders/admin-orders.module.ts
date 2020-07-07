import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminOrdersRoutingModule } from './admin-orders-routing.module';

import { AdminOrdersComponent } from './admin-orders.component';

import { AdminOrdersListComponent } from './admin-orders-list/admin-orders-list.component';
import { AdminOrdersDeleteComponent } from './admin-orders-delete/admin-orders-delete.component';
import { AdminOrdersDetailComponent } from './admin-orders-detail/admin-orders-detail.component';
import { AdminOrdersEditComponent } from './admin-orders-edit/admin-orders-edit.component';
import { AdminOrdersAddComponent } from './admin-orders-add/admin-orders-add.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminOrdersRoutingModule
  ],
  declarations: [
    AdminOrdersComponent,
    AdminOrdersDeleteComponent,
    AdminOrdersDetailComponent,
    AdminOrdersEditComponent,
    AdminOrdersListComponent,
    AdminOrdersAddComponent
  ],
  exports: [
    AdminOrdersRoutingModule
  ]
})
export class AdminOrdersModule { }
