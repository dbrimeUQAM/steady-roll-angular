import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HospitalService } from '../../../services/hospital/hospital.service';
import { Router } from '@angular/router';
import { User } from '../../../services/user/user';
import { Hospital } from '../../../services/hospital/hospital';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-users-detail',
  templateUrl: './admin-users-detail.component.html',
  styleUrls: ['./admin-users-detail.component.css']
})
export class AdminUsersDetailComponent implements OnInit {

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  user: User = new User();
  roles: string[] = ['admin', 'user'];
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';
  hospitals: Hospital[];

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private hospitalService: HospitalService,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }

    if (this.route.snapshot.params.id === 'new') {
      this.user = new User();
    } else {
      this.userService.getUserById(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        this.user = res;
      }, err => {
        console.log(err);
      });
    }

    this.hospitalService.getAll()
    .subscribe((res: any) => {
      this.hospitals = res;
    }, err => {
      console.log(err);
    });

  }

  private updateUser(user: User) {
    this.userService.updateUser(user.email, user).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.openSnackBarSuccess('Utilisateur mis à jour!');
      this.router.navigate(['/admin/admin-users']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  private addUser(user: User) {
    this.userService.addUser(user).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      this.router.navigate(['/admin/admin-users']);
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.user._id).subscribe(data => {
      this.router.navigate(['/admin/admin-users']);
    });
  }

  onSubmit() {
    if (this.user) {
      if (this.user._id) {
        this.updateUser(this.user);
      }
      else {
        this.addUser(this.user);
      }
    }
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

}


