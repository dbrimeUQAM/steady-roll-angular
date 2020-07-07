import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHospitalsListComponent } from './admin-hospitals-list/admin-hospitals-list.component';
import { AdminHospitalsDeleteComponent } from './admin-hospitals-delete/admin-hospitals-delete.component';
import { AdminHospitalsDetailComponent } from './admin-hospitals-detail/admin-hospitals-detail.component';
import { AdminHospitalsEditComponent } from './admin-hospitals-edit/admin-hospitals-edit.component';
import { AdminHospitalsAddComponent } from './admin-hospitals-add/admin-hospitals-add.component';

const routes: Routes = [
  { path: '', component: AdminHospitalsListComponent },
  { path: 'list', component: AdminHospitalsListComponent },
  { path: 'add', component: AdminHospitalsAddComponent },
  { path: 'delete', component: AdminHospitalsDeleteComponent },
  { path: 'edit', component: AdminHospitalsEditComponent },
  { path: 'detail/:id', component: AdminHospitalsDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminHospitalsRoutingModule { }
