import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { User } from '../../../services/user/user';
import { Hospital } from '../../../services/hospital/hospital';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';


@Component({
  selector: 'app-admin-users-add',
  templateUrl: './admin-users-add.component.html',
  styleUrls: ['./admin-users-add.component.css']
})
export class AdminUsersAddComponent implements OnInit {

  user: User;
  roles: string[] = ['admin', 'user'];
  form: any = {};
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';
  hospitals: Hospital[];
  isLoadingResults = true;
  role;

  constructor(private router: Router,
              private hospitalService: HospitalService,
              private userService: UserService,
              private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {

    if (this.tokenStorage.getToken()) {
      this.role = this.tokenStorage.getUser().role;
      if (this.role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }

    this.hospitalService.getAll(null)
    .subscribe((res: any) => {
      this.hospitals = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  onSubmit() {
    this.userService.addUser(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSaveFailed = false;
        this.router.navigate(['/admin/admin-users']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSaveFailed = true;
      }
    );
  }

}


