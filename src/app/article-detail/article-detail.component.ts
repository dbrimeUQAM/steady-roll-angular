import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
import { OrderService } from '../services/order/order.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../services/article/article';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  article: Article ;
  articleForm: FormGroup ;
  public detailForm: FormGroup;
  offer: string;
  constructor( public dialog: MatDialog,
               private route: ActivatedRoute,
               private tokenStorage: TokenStorageService,
               private articleService: ArticleService,
               private orderService: OrderService,
               private formBuilder: FormBuilder,
               private datePipe: DatePipe) { }

  ngOnInit(): void {
   const articleId: string =  this.route.snapshot.params.id ;

   this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.article = data ;
      }, err => {
        console.log(err);
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
            value: this.article.description ,
            disabled: true}],
          expirationDate: [{
            value: this.datePipe.transform(this.article.expirationDate,"dd-MM-yyyy") ,
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
          quantity: [{
            value: this.article.quantity,
            disabled: true}],
          price: [{
            value: [this.article.price ],
            disabled: true}],
        });
      }
    );

  }
  // quand on click sur le bouton ajouter au panier
  openDialog(nom: string, type: string) {
    this.orderService.addArticleToOrder(this.tokenStorage.getUser().id, this.article._id, 1).subscribe(data => {
      const dialog = this.dialog.open(DialogContentComponent,
        {data: {name: nom, articleType: type}});
    });
  }

}


/* @Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-content.component.html',
})
export class DialogContent {} */
