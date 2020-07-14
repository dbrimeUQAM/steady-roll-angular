import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminContactsRoutingModule } from './admin-contacts-routing.module';

import { AdminContactsListComponent } from './admin-contacts-list/admin-contacts-list.component';
import { AdminContactsDetailComponent } from './admin-contacts-detail/admin-contacts-detail.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminContactsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminContactsDetailComponent,
    AdminContactsListComponent
  ],
  exports: [
    AdminContactsRoutingModule
  ]
})
export class AdminContactsModule { }
