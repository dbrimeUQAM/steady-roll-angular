import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  articleNum: Number = 0 ;

  name: string ;
  hospitalName: string ;

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('------>', this.tokenStorage.getUser() )
    this.name = this.tokenStorage.getUser().name;
    this.hospitalName= this.tokenStorage.getUser().hospital.name;
    this.articleNum = this.tokenStorage.getUser().order.articles.length ;
  }
  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }


}
