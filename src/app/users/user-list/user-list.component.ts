import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  columnsToDisplay: string[] = ['name', 'email', 'role', 'actions'];
  isLoadingResults = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getAll()
    .subscribe((res: any) => {
      this.users = res;
      console.log(this.users);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

}
