import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminUsersRoutingModule } from './admin-users-routing.module';

import { AdminUsersComponent } from './admin-users.component';

import { AdminUsersListComponent } from './admin-users-list/admin-users-list.component';
import { AdminUsersDeleteComponent } from './admin-users-delete/admin-users-delete.component';
import { AdminUsersDetailComponent } from './admin-users-detail/admin-users-detail.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';

import { MaterialModule } from '../../material.module';
import { AdminUsersAddComponent } from './admin-users-add/admin-users-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminUsersRoutingModule
  ],
  declarations: [
    AdminUsersComponent,
    AdminUsersDeleteComponent,
    AdminUsersDetailComponent,
    AdminUsersEditComponent,
    AdminUsersListComponent,
    AdminUsersAddComponent
  ],
  exports: [
    AdminUsersRoutingModule
  ]
})
export class AdminUsersModule { }
