import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../services/article/article';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article : Article ;
  articleForm: FormGroup ;
  public detailForm: FormGroup;
  offer: string;
  constructor(private route: ActivatedRoute, private articleService: ArticleService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   const articleId: string =  this.route.snapshot.params.id ;
   
    this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.article = data ;
        console.log(this.article) ;
      }, err => { 
        console.log(err)
      },
      () => {
        this.detailForm = this.formBuilder.group ({
          articleType: [{ 
            value: this.article.articleType, 
            disabled: true}],
          name: [{ 
            value: this.article.name, 
            disabled: true}],
          description: [{ 
            value: this.article.description, 
            disabled: true}],
          expirationDate: [{ 
            value: this.article.expirationDate, 
            disabled: true}],
          hospitalName: [{ 
            value: this.article.hospitalName, 
            disabled: true}],
          condition: [{ 
            value: this.article.condition, 
            disabled: true}],
          offerType: [{ 
            value: this.article.offerType, 
            disabled: true}],
          quantity:[{ 
            value: this.article.quantity, 
            disabled: true}],
          price: [{ 
            value: this.article.price, 
            disabled: true}],
        })



        this.articleForm = this.formBuilder.group ( {
          hospitalName : [{
            value : this.article.hospitalName,
            disabled: true
          }]
        })
      }
    ) 
    
  }

}
