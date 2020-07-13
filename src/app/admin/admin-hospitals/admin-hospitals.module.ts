import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminHospitalsRoutingModule } from './admin-hospitals-routing.module';

import { AdminHospitalsListComponent } from './admin-hospitals-list/admin-hospitals-list.component';
import { AdminHospitalsDetailComponent } from './admin-hospitals-detail/admin-hospitals-detail.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminHospitalsRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminHospitalsDetailComponent,
    AdminHospitalsListComponent
  ],
  exports: [
    AdminHospitalsRoutingModule
  ]
})
export class AdminHospitalsModule { }
