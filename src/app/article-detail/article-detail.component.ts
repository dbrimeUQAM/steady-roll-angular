import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
import { OrderService } from '../services/order/order.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public detailForm: FormGroup;
  offer: string;
  public hospitalName: string;
  public isReadOnly: boolean;
  constructor( public dialog: MatDialog,
               private route: ActivatedRoute,
               private router: Router,
               private tokenStorage: TokenStorageService,
               private articleService: ArticleService,
               private orderService: OrderService,
               private formBuilder: FormBuilder,
               private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.hospitalName = this.tokenStorage.getUser().hospital.name ;
   const articleId: string =  this.route.snapshot.params.id ;

   this.articleService.getArticleById(articleId).subscribe(
      data => {
        this.article = data ;
      }, err => {
        console.log(err);
      },
      () => {
        this.isReadOnly = this.hospitalName !== this.article.hospitalName;
        this.detailForm = this.formBuilder.group ({
          articleType: [{
            value: this.article.articleType,
            disabled: this.isReadOnly}],
          name: [{
            value: this.article.name,
            disabled: this.isReadOnly}],
          description: [{
            value: this.article.description ,
            disabled: this.isReadOnly}],
          expirationDate: [{
            value: this.article.expirationDate ,
            disabled: this.isReadOnly}],
          hospitalName: [{
            value: this.article.hospitalName,
            disabled: this.isReadOnly}],
          condition: [{
            value: this.article.condition,
            disabled: this.isReadOnly}],
          offerType: [{
            value: this.article.offerType,
            disabled: this.isReadOnly}],
          quantity: [{
            value: this.article.quantity,
            disabled: this.isReadOnly}],
          price: [{
            value: [this.article.price ],
            disabled: this.isReadOnly}],

            
        });
        this.detailForm.get('name').valueChanges.subscribe(data => {
          this.article.name = data;
        });
        this.detailForm.get('articleType').valueChanges.subscribe(data => {
          this.article.articleType = data;
          if(data === 'equipement' || data === 'fourniture') {
            this.article.expirationDate = '';
          }else if (data === 'medicament'){
            this.article.condition = ''
          }
        });
        this.detailForm.get('description').valueChanges.subscribe(data => {
          this.article.description = data;
        });
        this.detailForm.get('condition').valueChanges.subscribe(data => {
          this.article.condition = data ? data : '' ;
        });
        this.detailForm.get('quantity').valueChanges.subscribe(data => {
          this.article.quantity = data;
        });
        this.detailForm.get('expirationDate').valueChanges.subscribe(data => {
          this.article.expirationDate =  data ? data: '';
        });
        this.detailForm.get('offerType').valueChanges.subscribe(data => {
          this.article.offerType = data;
          if (this.article.offerType === 'donner') {
              this.article.price = 0;
          }
        });
        this.detailForm.get('price').valueChanges.subscribe(data => {
          this.article.price =  data ? data: 0;
        });
      }
    );


  }
  public save(){
      // update DB
      this.articleService.updateArticle(this.article._id, this.article).subscribe(data => {
        this.article = data ;
        console.log('update article', data)
        window.location.reload();
      }) ;
  }
  public delet(){
    // update DB
    this.articleService.deleteArticle(this.article._id).subscribe(data => {
      this.article = null ;
      console.log('delet article', this.article)
      window.location.reload();
    }) ;
    this.router.navigate(['/articles/all'])
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
