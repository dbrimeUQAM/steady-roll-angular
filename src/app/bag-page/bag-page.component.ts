import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
import { Article } from '../services/article/article';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bag-page',
  templateUrl: './bag-page.component.html',
  styleUrls: ['./bag-page.component.css']
})
export class BagPageComponent implements OnInit {
  displayedColumns: string[] = ['name', 'hospitalName', 'description', 'type', 'next'];
  articles: Article[] = [];
  article: Article;

  articleNum: Number = 0 ;
  public myFrom: FormGroup;
  public count: number ;
  public total: number = 0;

  dataSource: MatTableDataSource<Article>;
  receivedChildMessage: number = 0;


  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.articleService.getAll()
    .subscribe((res: any) => {
      this.articles = res;
      this.dataSource = new MatTableDataSource(this.articles);
    }, err => {
      console.log(err);
    },() =>{
      this.articleNum = this.articles.length ;
     /*  this.articleService.getArticleById('a97de9be823399d1b7377d1a7abbf2e2').subscribe( data =>{
        this.article = data
      }, err =>{console.log(err);
      },() =>{
          //
      }) */
    }
    );
  }
  getMessage(message: number) {
   /*  console.log('this.receivedChildMessage',this.receivedChildMessage)
    console.log('message',message) */

    this.receivedChildMessage = message ? this.receivedChildMessage + message: 0 ;
    console.log('this.receivedChildMessage',this.receivedChildMessage)
  }
 
getTotal(): number{
  return this.receivedChildMessage ;
}
}
