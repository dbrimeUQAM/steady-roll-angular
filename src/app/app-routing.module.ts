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

import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { BagPageComponent } from './bag-page/bag-page.component';

import { ArticlesListContainerComponent } from './articles/articles-list-container/articles-list-container.component';

import { MyOrdersComponent } from './orders/my-orders/my-orders.component';
import { MyInvoicesComponent } from './invoices/my-invoices/my-invoices.component';

import { ContactComponent } from './contact/contact.component';

// Admin
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { MyProfileComponent } from './my-profile/my-profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'admin', component: AdminHomeComponent },
  { path: 'bag', component: BagPageComponent },
  { path: 'add-article', component: AddArticleComponent },
  { path: 'article-detail/:id', component: ArticleDetailComponent, data: { title: 'Article'} },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UserListComponent, data: { title: 'Liste de Utilisateurs'} },
  { path: 'user-create', component: UserCreateComponent, data: { title: 'Nouveau Utilisateur' } },
  { path: 'user-update/:id', component: UserUpdateComponent, data: { title: 'Modifier Utilisateur' } },
  { path: 'user-details/:id', component: UserDetailsComponent, data: { title: 'Utilisateur' } },
  { path: 'articles/my-articles', component: ArticlesListContainerComponent, data: { filter: 'my-articles'} },
  { path: 'articles/all', component: ArticlesListContainerComponent, data: { title: 'Liste des Articles', filter: 'all'} },
  { path: 'articles/drugs', component: ArticlesListContainerComponent, data: { cloudantFilter: 'medicament'} },
  { path: 'articles/supplies', component: ArticlesListContainerComponent, data: { cloudantFilter: 'fourniture'} },
  { path: 'articles/equipments', component: ArticlesListContainerComponent, data: { cloudantFilter: 'equipement'} },
  { path: 'my-orders', component: MyOrdersComponent },
  { path: 'my-invoices', component: MyInvoicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'payement', component: PaymentPageComponent },
  { path: 'my-profile', component: MyProfileComponent },

  {
    path: 'admin-users',
    loadChildren: () => import('./admin/admin-users/admin-users.module').then(m => m.AdminUsersModule)
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    children: [
      {
        path: 'admin-users',
        loadChildren: () => import('./admin/admin-users/admin-users.module').then(m => m.AdminUsersModule)
      },
      {
        path: 'admin-hospitals',
        loadChildren: () => import('./admin/admin-hospitals/admin-hospitals.module').then(m => m.AdminHospitalsModule)
      },
      {
        path: 'admin-articles',
        loadChildren: () => import('./admin/admin-articles/admin-articles.module').then(m => m.AdminArticlesModule)
      },
      {
        path: 'admin-orders',
        loadChildren: () => import('./admin/admin-orders/admin-orders.module').then(m => m.AdminOrdersModule)
      },
      {
        path: 'admin-invoices',
        loadChildren: () => import('./admin/admin-invoices/admin-invoices.module').then(m => m.AdminInvoicesModule)
      },
      {
        path: 'admin-contacts',
        loadChildren: () => import('./admin/admin-contacts/admin-contacts.module').then(m => m.AdminContactsModule)
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
