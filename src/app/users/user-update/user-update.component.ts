import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  public userForm: FormGroup;
  _id = '';
  rolesList = ['admin', 'user'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUserById(this.route.snapshot.params.id);
    this.userForm = this.formBuilder.group({
      _id: '',
      _rev: '',
      type: 'user',
      name: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required]
    });
  }

  getUserById(id: any) {
    this.api.getUserById(id).subscribe((data: any) => {
      this.userForm.setValue({
        _id: data._id,
        _rev: data._rev,
        type: data.type,
        name: data.name,
        email: data.email,
        role: data.role
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateUser(this.userForm.value._id, this.userForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/user-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  userDetails() {
    this.router.navigate(['/user-details', this.userForm.value._id]);
  }

}
