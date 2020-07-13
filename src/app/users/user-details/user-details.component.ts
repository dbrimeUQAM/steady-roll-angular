import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user: User;
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: UserService, private router: Router) { }

  getUserDetails(id: string) {
    this.api.getUserById(id)
      .subscribe((data: any) => {
        this.user = data;
        console.log(this.user);
        this.isLoadingResults = false;
      });
  }

  ngOnInit(): void {
    this.getUserDetails(this.route.snapshot.params.id);
  }

  deleteUser(id: any) {
    this.isLoadingResults = true;
    this.api.deleteUser(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/users']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
