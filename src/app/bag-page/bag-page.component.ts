import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { Article } from '../services/article/article';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from '../services/token-storage/token-storage.service';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css']
})
export class BagPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'hospitalName', 'description', 'type', 'next'];
  articles: Article[] = [];
  article: Article;

  articleNum = 0 ;
  public myFrom: FormGroup;
  public count: number ;
  public total = 0;

  dataSource: MatTableDataSource<Article>;
  receivedChildMessage = 0;


  constructor(private orderService: OrderService, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.orderService.getCurrentOrder(this.tokenStorage.getUser().id)
    .subscribe((res: any) => {
      this.articles = res.articles;
      this.dataSource = new MatTableDataSource(this.articles);
    }, err => {
      console.log(err);
    }, () => {
      this.articleNum = this.articles.length ;
    }
    );
  }
  getMessage(message: number) {
   /*  console.log('this.receivedChildMessage',this.receivedChildMessage)
    console.log('message',message) */

    this.receivedChildMessage = message ? this.receivedChildMessage + message : 0 ;
    console.log('this.receivedChildMessage', this.receivedChildMessage);
  }

  getTotal(): number{
    return this.receivedChildMessage ;
  }
}
