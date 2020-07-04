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

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';

import { UserListComponent } from './users/user-list/user-list.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserUpdateComponent } from './users/user-update/user-update.component';
import { RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { AddArticleComponent } from './add-article/add-article.component';

import { DialogElementsComponent } from './dialog-elements/dialog-elements.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ArticlesListComponent } from './articles/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { MatNativeDateModule } from '@angular/material/core';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { BagPageComponent } from './bag-page/bag-page.component';
import { MatBadgeModule } from '@angular/material/badge';
import { LineInputComponent } from './line-input/line-input.component';
import { AdministrationComponent } from './administration/administration.component';

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
    LineInputComponent,
    AdministrationComponent
  ],
  imports: [
    MatBadgeModule,
    MatMenuModule,
    RecaptchaModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  entryComponents: [DialogElementsComponent],
  providers: [
    authInterceptorProviders,
    /*  , 
    useValue:  { 
      siteKey:'6LfESf8UAAAAAMPV7RYGcD4Tik_LuUCWdSyz5X4F' 
    } as RecaptchaSettings */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
