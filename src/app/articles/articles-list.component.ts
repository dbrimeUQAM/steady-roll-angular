import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleService } from '../services/articles.service';
import { Article } from '../services/article';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-article-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles: Article[] = [];
  columnsToDisplay: string[] = ['name', 'description', 'hospitalName', 'articleType'];
  isLoadingResults = true;
  dataSource: MatTableDataSource<Article>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private articleService: ArticleService) {
    
   }

  ngOnInit(): void {

    this.articleService.getAll()
    .subscribe((res: any) => {
      this.articles = res;
      console.log(this.articles);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
    this.dataSource = new MatTableDataSource(this.articles)
    console.log(this.dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
 /*  sortData(sort: Sort) {
    const data = this.articles;
    if (!sort.active || sort.direction === '') {
      this.articles = data;
      return;
    }

    this.articles = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'description': return compare(a.description, b.description, isAsc);
        case 'hospital': return compare(a.hospitalName, b.hospitalName, isAsc);
        case 'type': return compare(a.articleType, b.articleType, isAsc);
        default: return 0;
      }
    });
    function compare(a: number | string, b: number | string, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  } */


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  

}
