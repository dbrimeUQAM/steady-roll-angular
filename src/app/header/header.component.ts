import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  name: String ;
  constructor( private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.name = this.tokenStorage.getUser().name;
  }
  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
  home($event) {
    this.router.navigate(['/home']);
  }

}
