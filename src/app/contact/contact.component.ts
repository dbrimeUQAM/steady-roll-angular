import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactService } from '../services/contact/contact.service';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { Contact } from '../services/contact/contact';
import { User } from '../services/user/user';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  user: User;
  public contactForm: FormGroup;
  message: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private contactService: ContactService,
              private userService: UserService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.contact = new Contact();

    this.userService.getUserById(this.tokenStorage.getUser().email)
    .subscribe((res: any) => {
      this.user = res;

      this.contactForm = this.formBuilder.group({
        message: ['', Validators.required],
        name: new FormControl({value: this.user.name, disabled: true}, Validators.required),
        email: new FormControl({value: this.user.email, disabled: true}, Validators.required),
        phone: new FormControl({value: this.user.phone, disabled: true}, Validators.required),
      });

      this.contactForm.get('message').valueChanges.subscribe(data => {
        this.contact.message = data;
      });

    }, err => {
      console.log(err);
    });

  }

  submit() {

    if (this.contactForm.get('message').invalid) {
      this.message = true;
    }

    if (this.contactForm.valid) {
      this.contact.name = this.contactForm.get('name').value;
      this.contact.email = this.contactForm.get('email').value;
      this.contact.phone = this.contactForm.get('phone').value;
      this.contact.hospitalId = this.tokenStorage.getUser().hospital._id;
      this.contact.read = false;
      this.contactService.addContact(this.contact).subscribe(data => {
        this.router.navigate(['/home']);
      });
    }

  }

}
