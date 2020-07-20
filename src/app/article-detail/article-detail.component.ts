import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article/article.service';
import { OrderService } from '../services/order/order.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../services/article/article';
import { HeaderService } from '../services/header/header.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DatePipe } from '@angular/common';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;
  article: Article ;
  public detailForm: FormGroup;
  offer: string;
  public hospitalName: string;
  public isReadOnly: boolean;
  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog,
               private route: ActivatedRoute,
               private router: Router,
               private tokenStorage: TokenStorageService,
               private headerService: HeaderService,
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
          qty: [{
            value: this.article.qty,
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
          if (data === 'équipement' || data === 'fourniture') {
            this.article.expirationDate = '';
          }else if (data === 'médicament'){
            this.article.condition = '';
          }
        });
        this.detailForm.get('description').valueChanges.subscribe(data => {
          this.article.description = data;
        });
        this.detailForm.get('condition').valueChanges.subscribe(data => {
          this.article.condition = data ? data : '' ;
        });
        this.detailForm.get('qty').valueChanges.subscribe(data => {
          this.article.qty = data;
        });
        this.detailForm.get('expirationDate').valueChanges.subscribe(data => {
          this.article.expirationDate =  data ? data : '';
        });
        this.detailForm.get('offerType').valueChanges.subscribe(data => {
          this.article.offerType = data;
          if (this.article.offerType === 'don') {
              this.article.price = 0;
          }
        });
        this.detailForm.get('price').valueChanges.subscribe(data => {
          this.article.price =  data ? data : 0;
        });
      }
    );


  }
  public save(){
      // update DB
      this.articleService.updateArticle(this.article._id, this.article).subscribe(data => {
        this.article = data ;
        this.snackBar.open('Article sauvegardé!', 'fermer', {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: 'center' ,
          verticalPosition: 'top',
          panelClass: ['style-success']
        });
        this.ngOnInit();
      }) ;
  }
  public delete(){
    // update DB
    this.articleService.deleteArticle(this.article._id).subscribe(data => {
      this.article = null ;
      this.snackBar.open('Article supprimé!', 'fermer', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
        panelClass: ['style-success']
      });
      this.router.navigate(['/articles/my-articles']);
    });
  }
  // quand on click sur le bouton ajouter au panier
  openDialog(nom: string, type: string) {
    this.orderService.addArticleToOrder(this.tokenStorage.getUser().id, this.article._id, 1).subscribe(data => {
      const dialog = this.dialog.open(DialogContentComponent,
        {data: {name: nom, articleType: type}});
    });
  }

  openSnackBar(articleId: string) {
    const user = this.tokenStorage.getUser();
    this.orderService.addArticleToOrder(user.id, articleId, 1).subscribe(data => {
      this.headerService.setCartQty(data.articles.length);
      this.snackBar.open('Ajouté au panier!', 'fermer', {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
        panelClass: ['style-success']
      });
    });
  }

}


/* @Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './dialog-content.component.html',
})
export class DialogContent {} */
