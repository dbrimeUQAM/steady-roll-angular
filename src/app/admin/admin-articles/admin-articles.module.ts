import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminArticlesRoutingModule } from './admin-articles-routing.module';

import { AdminArticlesListComponent } from './admin-articles-list/admin-articles-list.component';
import { AdminArticlesDetailComponent } from './admin-articles-detail/admin-articles-detail.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminArticlesRoutingModule
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
