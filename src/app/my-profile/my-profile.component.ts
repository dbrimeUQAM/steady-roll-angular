import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../services/user/user';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User = new User();
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';

  constructor(private router: Router,
              private userService: UserService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
    }

    this.userService.getUserById(this.tokenStorage.getUser().email)
      .subscribe((res: any) => {
        this.user = res;
      }, err => {
        console.log(err);
      });

  }

  private updateUser(user: User) {
    this.userService.updateUser(user.email, user).subscribe(data => {
      this.isSuccessful = true;
      this.isSaveFailed = false;
      if (data.passwordUpdated) {
        this.tokenStorage.signOut();
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']);
      }
    },
    err => {
      this.errorMessage = err.error.message;
      this.isSaveFailed = true;
    });
  }

  onSubmit() {
    if (this.user) {
      if (this.user._id) {
        this.updateUser(this.user);
      }
    }
  }

}


