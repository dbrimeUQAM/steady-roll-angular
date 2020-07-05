import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { OrderService } from '../services/order/order.service';
import { Article } from '../services/order/article';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  articles: Article[] = [];
  articleNum: Number = 0 ;

  name: string ;
  hospitalName: string ;

  constructor(private orderService: OrderService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    console.log('------>', this.tokenStorage.getUser() )
    this.name = this.tokenStorage.getUser().name;
    this.hospitalName= this.tokenStorage.getUser().hospital.name;

    this.orderService.getAll(this.tokenStorage.getUser().id).subscribe(data => {
      this.articles= data ;
    }, err =>{
      console.log(err);
    },()=> {
      this.articleNum = this.articles.length ;
    }
    )
  }
  onClick($event) {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }


}
