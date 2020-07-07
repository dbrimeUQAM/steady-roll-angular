import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminHospitalsRoutingModule } from './admin-hospitals-routing.module';

import { AdminHospitalsComponent } from './admin-hospitals.component';

import { AdminHospitalsListComponent } from './admin-hospitals-list/admin-hospitals-list.component';
import { AdminHospitalsDeleteComponent } from './admin-hospitals-delete/admin-hospitals-delete.component';
import { AdminHospitalsDetailComponent } from './admin-hospitals-detail/admin-hospitals-detail.component';
import { AdminHospitalsEditComponent } from './admin-hospitals-edit/admin-hospitals-edit.component';
import { AdminHospitalsAddComponent } from './admin-hospitals-add/admin-hospitals-add.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminHospitalsRoutingModule
  ],
  declarations: [
    AdminHospitalsComponent,
    AdminHospitalsDeleteComponent,
    AdminHospitalsDetailComponent,
    AdminHospitalsEditComponent,
    AdminHospitalsListComponent,
    AdminHospitalsAddComponent
  ],
  exports: [
    AdminHospitalsRoutingModule
  ]
})
export class AdminHospitalsModule { }
