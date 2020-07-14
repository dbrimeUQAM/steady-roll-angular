import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminContactsListComponent } from './admin-contacts-list/admin-contacts-list.component';
import { AdminContactsDetailComponent } from './admin-contacts-detail/admin-contacts-detail.component';

const routes: Routes = [
  { path: '', component: AdminContactsListComponent },
  { path: 'list', component: AdminContactsListComponent },
  { path: 'detail/:id', component: AdminContactsDetailComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminContactsRoutingModule { }
