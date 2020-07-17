import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Article } from '../services/article/article';
import { ArticleService } from '../services/article/article.service';
import { OrderService } from '../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage/token-storage.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HeaderService } from '../services/header/header.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  displayedColumns: string[] = ['name', 'hospitalName', 'description', 'type', 'next'];
  dataSource: MatTableDataSource<Article>;
  articles: Article[] = [];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  cloudantFilter;
  filter;
  durationInSeconds = 5;
  hospitalName: string;
  filterName: string;

  constructor(private snackBar: MatSnackBar,
              private articleService: ArticleService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorageService,
              private headerService: HeaderService ) {
    this.filter = route.snapshot.data.filter;
    this.cloudantFilter = route.snapshot.data.cloudantFilter;
  }

  ngOnInit() {

    this.articleService.getAll(this.cloudantFilter)
    .subscribe((res: any) => {
      this.articles = res;

      if (this.filter) {

        const hospitalId = this.tokenStorage.getUser().hospital._id;

        if (this.filter === 'all') {
          this.articles = this.articles.filter(article => article.hospitalId !== hospitalId);
        }

        if (this.filter === 'my-articles') {
          this.articles = this.articles.filter(article => article.hospitalId === hospitalId);
        }

      }

      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });

  }

  openSnackBar(articleId: string) {
    const user = this.tokenStorage.getUser();
    this.orderService.addArticleToOrder(user.id, articleId, 1).subscribe(data => {
      this.headerService.setCartQty(data.articles.length);
      this.snackBar.openFromComponent(PizzaPartyComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

@Component({
  selector: 'app-snack-bar-add-to-cart',
  templateUrl: 'snack-bar-add-to-cart.html',
})
export class PizzaPartyComponent {}
