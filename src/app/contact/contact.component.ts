import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ContactService } from '../services/contact/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../services/contact/contact';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  public contactForm: FormGroup;
  message: boolean;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private contactService: ContactService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log(this.tokenStorage.getUser());
    this.contact = new Contact();

    this.contactForm = this.formBuilder.group({
      message: ['', Validators.required],
      name: new FormControl({value: this.tokenStorage.getUser().name, disabled: true}, Validators.required),
      email: new FormControl({value: this.tokenStorage.getUser().email, disabled: true}, Validators.required),
      phone: new FormControl({value: this.tokenStorage.getUser().phone, disabled: true}, Validators.required),
    });

    this.contactForm.get('message').valueChanges.subscribe(data => {
      this.contact.message = data;
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
      this.contactService.addContact(this.contact).subscribe(data => {
        this.router.navigate(['/home']);
      });
    }

  }

}
