import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Article } from '../services/article/article';
import { ArticleService } from '../services/article/article.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

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
  filter;

  constructor(private _snackBar: MatSnackBar, private articleService: ArticleService, route: ActivatedRoute ) {
    this.filter = route.snapshot.data.filter;
  }

  ngOnInit() {

    console.log(this.filter);
    this.articleService.getAll(this.filter)
    .subscribe((res: any) => {
      this.articles = res;
      this.dataSource = new MatTableDataSource(this.articles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, err => {
      console.log(err);
    });

  }
  openSnackBar() {
    /* this.orderService.addArticleToOrder(this.article).subscribe(data =>
      {
        const id = data._id ; 
      } ); */ 
    this._snackBar.openFromComponent(PizzaPartyComponent, {
      duration: 4 * 1000,
      horizontalPosition: 'center' ,
      verticalPosition: 'top',
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
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snack-bar-component-example-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent {}
