import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService } from '../../../services/contact/contact.service';
import { Router } from '@angular/router';
import { Contact } from '../../../services/contact/contact';
import { TokenStorageService } from '../../../services/token-storage/token-storage.service';

@Component({
  selector: 'app-admin-contacts-detail',
  templateUrl: './admin-contacts-detail.component.html',
  styleUrls: ['./admin-contacts-detail.component.css']
})
export class AdminContactsDetailComponent implements OnInit {

  contact: Contact = new Contact();
  errorMessage = '';

  constructor(private router: Router,
              private contactService: ContactService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params);

    if (this.tokenStorage.getToken()) {
      if (this.tokenStorage.getUser().role !== 'admin') {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/home']);
    }

    this.contactService.getContactById(this.route.snapshot.params.id)
      .subscribe((res: any) => {
        this.contact = res;
        if (!this.contact.read) {
          this.markAsRead(this.contact._id);
        }
    }, err => {
        console.log(err);
    });

  }

  private markAsRead(contactId: string) {
    this.contactService.markAsReadContact(contactId).subscribe(data => {

    },
    err => {
      this.errorMessage = err.error.message;
    });
  }

  deleteContact() {
    this.contactService.deleteContact(this.contact._id).subscribe(data => {
      this.router.navigate(['/admin/admin-contacts']);
    });
  }

}

