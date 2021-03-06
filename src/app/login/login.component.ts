import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  captchaDone = false;
  hide = true;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = '';

  constructor(private router: Router,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.router.navigate(['/home']);
    }
  }

  resolved(captchaResponse: string) {
    this.captchaDone = true;
  }

  onSubmit() {
    if (this.captchaDone) {
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = data.role;
          if (this.role === 'user') {
            this.tokenStorage.saveCartQty(data.order.articles.length);
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/admin/admin-users']);
          }

        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }

  }
}
