import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArticleService } from '../../../services/article/article.service';
import { Article } from '../../../services/article/article';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-articles-list',
  templateUrl: './admin-articles-list.component.html',
  styleUrls: ['./admin-articles-list.component.css']
})
export class AdminArticlesListComponent implements OnInit {
  private configSuccess: MatSnackBarConfig = {
    panelClass: ['style-success'],
    duration: 4000,
    horizontalPosition: 'center' ,
    verticalPosition: 'top'
  };
  articles: Article[] = [];
  columnsToDisplay: string[] = ['articleType', 'name', 'description', 'hospitalName', 'qty', 'actions'];
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  isLoadingResults = true;

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
      this.openSnackBarSuccess('Supprimé');
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

  openSnackBarSuccess(message: string) {
    this.snackBar.open(message, 'fermer', this.configSuccess);
  }

}


