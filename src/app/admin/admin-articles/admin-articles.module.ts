import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AdminArticlesRoutingModule } from './admin-articles-routing.module';

import { AdminArticlesListComponent } from './admin-articles-list/admin-articles-list.component';
import { AdminArticlesDetailComponent } from './admin-articles-detail/admin-articles-detail.component';

import { MaterialModule } from '../../material.module';

import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminArticlesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot()
  ],
  declarations: [
    AdminArticlesDetailComponent,
    AdminArticlesListComponent
  ],
  exports: [
    AdminArticlesRoutingModule
  ]
})
export class AdminArticlesModule { }
