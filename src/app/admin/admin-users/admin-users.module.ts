import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminUsersRoutingModule } from './admin-users-routing.module';

import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUsersDetailComponent } from './admin-users-detail/admin-users-detail.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminUsersRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminUsersDetailComponent,
    AdminUsersListComponent
  ],
  exports: [
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
