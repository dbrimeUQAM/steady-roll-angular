import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from '../../../services/article/article.service';
import { Article } from '../../../services/article/article';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-articles-list',
  templateUrl: './admin-articles-list.component.html',
  styleUrls: ['./admin-articles-list.component.css']
})
export class AdminArticlesListComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  articles: Article[] = [];
  columnsToDisplay: string[] = ['articleType', 'name', 'description', 'hospitalName', 'quantity', 'actions'];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar,
              private articleService: ArticleService) { }

  ngOnInit(): void {

    this.articleService.getAll(null)
    .subscribe((res: any) => {
      this.articles = res;
      this.isLoadingResults = false;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });

  }

  deleteArticle(articleId: string) {
    this.articleService.deleteArticle(articleId).subscribe(data => {
      this.snackBar.openFromComponent(PizzaPartyDeleteArticleComponent, {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: 'center' ,
        verticalPosition: 'top',
      });
      this.ngOnInit();
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
  selector: 'app-snack-bar-delete-user',
  templateUrl: '../../../snack-bar-messages/snack-bar-deleted.html',
})
export class PizzaPartyDeleteArticleComponent {}
