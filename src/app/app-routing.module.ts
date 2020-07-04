import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddArticleComponent } from './add-article/add-article.component';

import { ArticlesListComponent } from './articles/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { BagPageComponent } from './bag-page/bag-page.component';
import { AdministrationComponent } from './administration/administration.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'admin', component: AdministrationComponent },
  { path: 'bag', component: BagPageComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent, data: { title: 'Article'} },
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
