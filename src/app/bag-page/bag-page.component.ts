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
  public total = 0 ;
  public count: number ;

  dataSource: MatTableDataSource<Article>;
  receivedChildMessage: number;


  constructor(private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   
    this.articleService.getAll()
    .subscribe((res: any) => {
      this.articles = res;
      this.dataSource = new MatTableDataSource(this.articles);
      console.log(this.articles);
    }, err => {
      console.log(err);
    },() =>{
      this.articleNum = this.articles.length ;
      this.articleService.getArticleById('a97de9be823399d1b7377d1a7abbf2e2').subscribe( data =>{
        console.log('article:', data)
        this.article = data
      }, err =>{console.log(err);
      },() =>{
        
        this.myFrom = this.formBuilder.group ({
          quantity: 1,
          price: this.article.price,
          total: [{ value: 0, disabled: true}] 
        }) ;    
        this.myFrom.get('quantity').valueChanges.subscribe(
          data => {
            console.log('data----------',data);
          this.myFrom.get('total').setValue(data * this.article.price);
          }
        )
      })
    }
    );
  }
  getMessage(message: number) {
    this.receivedChildMessage = message;
  }
 
getTotal(): number{
  let total = 0 ;
  console.log('total avant', total)
  total = total + this.receivedChildMessage ;
  console.log('total apres', total)

  return total
}
}
