import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from './helpers/auth.interceptor';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { AddArticleComponent } from './add-article/add-article.component';

import { DialogElementsComponent } from './dialog-elements/dialog-elements.component';
import { ArticlesListComponent } from './articles/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { BagPageComponent } from './bag-page/bag-page.component';

// Admin
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';

import { MaterialModule } from './material.module';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailsComponent,
    UserUpdateComponent,
    HomePageComponent,
    HeaderComponent,
    AddArticleComponent,
    DialogElementsComponent,
    ArticlesListComponent,
    ArticleDetailComponent,
    DialogContentComponent,
    BagPageComponent,
    AdminHomeComponent,
    SidenavComponent,
  ],
  imports: [
    RecaptchaModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
  ],
  entryComponents: [DialogElementsComponent],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
