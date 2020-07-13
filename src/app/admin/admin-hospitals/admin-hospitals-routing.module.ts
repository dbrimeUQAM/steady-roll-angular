import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminHospitalsListComponent } from './admin-hospitals-list/admin-hospitals-list.component';
import { AdminHospitalsDetailComponent } from './admin-hospitals-detail/admin-hospitals-detail.component';

const routes: Routes = [
  { path: '', component: AdminHospitalsListComponent },
  { path: 'list', component: AdminHospitalsListComponent },
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
