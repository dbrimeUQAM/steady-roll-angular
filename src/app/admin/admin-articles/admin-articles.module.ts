import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminArticlesRoutingModule } from './admin-articles-routing.module';

import { AdminArticlesComponent } from './admin-articles.component';

import { AdminArticlesListComponent } from './admin-articles-list/admin-articles-list.component';
import { AdminArticlesDeleteComponent } from './admin-articles-delete/admin-articles-delete.component';
import { AdminArticlesDetailComponent } from './admin-articles-detail/admin-articles-detail.component';
import { AdminArticlesEditComponent } from './admin-articles-edit/admin-articles-edit.component';
import { AdminArticlesAddComponent } from './admin-articles-add/admin-articles-add.component';

import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    AdminArticlesRoutingModule
  ],
  declarations: [
    AdminArticlesComponent,
    AdminArticlesDeleteComponent,
    AdminArticlesDetailComponent,
    AdminArticlesEditComponent,
    AdminArticlesListComponent,
    AdminArticlesAddComponent
  ],
  exports: [
    AdminArticlesRoutingModule
  ]
})
export class AdminArticlesModule { }
