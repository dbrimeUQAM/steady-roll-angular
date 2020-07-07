import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Router } from '@angular/router';
import { User } from '../../../services/user/user';

@Component({
  selector: 'app-admin-users-add',
  templateUrl: './admin-users-add.component.html',
  styleUrls: ['./admin-users-add.component.css']
})
export class AdminUsersAddComponent implements OnInit {

  user: User;

  public userForm: FormGroup;
  labelPosition: string;
  roles: string[] = ['admin', 'user'];
  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService ) { }

  ngOnInit(): void {
    this.user = new User();

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.userForm.get('name').valueChanges.subscribe(data => {
      this.user.name = data;
    });
  }

  submit() {

    this.userService.addUser(this.user).subscribe(data => {
      const id = data._id;
      this.router.navigate(['/admin/admin-users']);
    });
  }

}



