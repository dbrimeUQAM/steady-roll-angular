import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { HospitalService } from '../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { Hospital } from '../services/hospital/hospital';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  hospitals: Hospital[];
  isLoadingResults = true;

  isLoggedIn = false;
  isLoginFailed = false;
  role = '';

  constructor(private router: Router,
              private hospitalService: HospitalService,
              private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.router.navigate(['/home']);
    }

    this.hospitalService.getAll()
    .subscribe((res: any) => {
      this.hospitals = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
