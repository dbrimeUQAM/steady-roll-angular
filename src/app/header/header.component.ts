import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

import { MatSidenav } from '@angular/material/sidenav';
import { User } from '../services/user/user';
import { OrderService } from '../services/order/order.service';
import { Article } from '../services/article/article';

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
  user: User;
  articles: Article[]=[];

  constructor(private orderService:OrderService, private router: Router, private tokenStorage: TokenStorageService ) { }

  ngOnInit(): void {
    this.inputSideNav.open();
    this.user = this.tokenStorage.getUser().hospital ;
    console.log('user dans header', this.tokenStorage.getUser())
    this.name = this.user.name;
    this.hospitalName = this.tokenStorage.getUser().hospital ? this.tokenStorage.getUser().hospital.name : '';
    this.articleNum = this.tokenStorage.getUser().hospital.order ? this.tokenStorage.getUser().hospital.articles.length : 0 ;
    this.orderService.getCurrentOrder(this.tokenStorage.getUser().id)
    .subscribe((res: any) => {
      console.log('my order', res)
      this.articles = res.articles;
    }, err => {
      console.log(err);
    }, () => {
      this.articleNum = this.articles.length ;
    })
    console.log('number articles', this.articleNum)

  }

  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

}
