import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

import { MatSidenav } from '@angular/material/sidenav';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() inputSideNav: MatSidenav;
  name: string;
  articleNum;
  hospitalName: string;
  role;

  constructor( private router: Router,
               private tokenStorage: TokenStorageService,
               private headerService: HeaderService ) {
                 this.headerService.cartQty$.subscribe( (qty) => this.articleNum = qty );
  }

  ngOnInit(): void {
    this.inputSideNav.open();
    const user = this.tokenStorage.getUser();
    this.name = user.name;
    this.hospitalName = user.hospital ? user.hospital.name : '';
    this.articleNum = this.tokenStorage.getCartQty();
    this.role = user.role;
  }

  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
