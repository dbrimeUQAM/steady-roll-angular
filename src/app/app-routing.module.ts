import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';

import { ArticlesListComponent } from './articles/articles-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserListComponent, data: { title: 'Liste de Utilisateurs'} },
  { path: 'user-create', component: UserCreateComponent, data: { title: 'Nouveau Utilisateur' } },
  { path: 'user-update/:id', component: UserUpdateComponent, data: { title: 'Modifier Utilisateur' } },
  { path: 'user-details/:id', component: UserDetailsComponent, data: { title: 'Utilisateur' } },
  { path: 'articles', component: ArticlesListComponent, data: { title: 'Liste des Articles'} }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
