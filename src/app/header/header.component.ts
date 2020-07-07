import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() inputSideNav: MatSidenav;
  name: string;
  articleNum = 0;
  hospitalName: string;

  constructor( private router: Router, private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {
    this.inputSideNav.open();
    const user = this.tokenStorage.getUser();
    this.name = user.name;
    this.hospitalName = user.hospital ? user.hospital.name : '';
    this.articleNum = user.order ? user.order.articles.length : 0 ;
  }

  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
