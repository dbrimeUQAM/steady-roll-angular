import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order/order.service';
import { Router } from '@angular/router';
import { Order } from '../services/order/order';
import { Article } from '../services/article/article';
import { HeaderService } from '../services/header/header.service';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };

  articles: Article[] = [];
  columnsToDisplay: string[] = ['articleType', 'name', 'description', 'hospitalName', 'price', 'qty', 'sub-total', 'actions'];
  dataSource: MatTableDataSource<Article>;

  order: Order = new Order();
  isSuccessful = false;
  isSaveFailed = false;
  errorMessage = '';
  isLoaded = false;

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private orderService: OrderService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private headerService: HeaderService) { }

  ngOnInit(): void {

    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/login']);
    } else {
      this.orderService.getCurrentOrder(this.tokenStorage.getUser().email)
      .subscribe((res: any) => {
        this.order = res;
        this.articles = res.articles;
        this.dataSource = new MatTableDataSource(this.articles);
        this.isLoaded = true;
      }, err => {
        console.log(err);
      });
    }

  }

  cancelOrder() {
    this.orderService.deleteAllArticles(this.tokenStorage.getUser().id).subscribe(data => {
      this.headerService.setCartQty(0);
      this.openSnackBarSuccess('Votre commande a été annulé.');
      this.ngOnInit();
    });
  }

  addQty(articleId: string, currentQty: number) {
    currentQty++;
    this.orderService.updateArticleQtyById(this.tokenStorage.getUser().id, articleId, currentQty).subscribe(data => {
        if (data.error) {
          // display error message
          this.openSnackBarError(data.error);
        } else {
          this.openSnackBarSuccess('Quantité mis à jour!');
          this.ngOnInit();
        }
      }, err => {
        console.log(err);
      });
  }

  removeQty(articleId: string, currentQty: number) {
    if (currentQty === 1) {
      this.orderService.deleteArticle(this.tokenStorage.getUser().id, articleId).subscribe(data => {
        this.headerService.setCartQty(data.articles.length);
        this.openSnackBarSuccess('Supprimé');
        this.ngOnInit();
      }, err => {
        console.log(err);
      });
    } else {
      currentQty--;
      this.orderService.updateArticleQtyById(this.tokenStorage.getUser().id, articleId, currentQty).subscribe(data => {
        if (data.error) {
          // display error message
          this.openSnackBarError(data.error);
        } else {
          this.openSnackBarSuccess('Quantité mis à jour!');
          this.ngOnInit();
        }
      }, err => {
        console.log(err);
      });
    }
  }

  removeArticle(articleId: string){
    this.orderService.deleteArticle(this.tokenStorage.getUser().id, articleId).subscribe(data => {
      this.headerService.setCartQty(data.articles.length);
      this.openSnackBarSuccess('Supprimé');
      this.ngOnInit();
    }, err => {
      console.log(err);
    });
  }

  getTotalQty() {
    return this.articles.map(a => a.qty).reduce((acc, value) => acc + value, 0);
  }

  getTotalPrice() {
    return this.articles.map(a => a.price * a.qty).reduce((acc, value) => acc + value, 0);
  }

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

  openSnackBarError(message: string) {
    this.snackBar.open(message, 'fermer', this.configError);
  }

}

