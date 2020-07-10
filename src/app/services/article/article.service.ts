import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Article } from './article';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.production ? '/api/articles/' : 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  getAll(filter: string): Observable<Article[]> {
    let url = apiUrl;
    if (filter) {
      url += `?filter=${filter}`;
    }
    return this.httpClient.get<Article[]>(url)
    .pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getArticleById(id: string): Observable<Article> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<Article>(url).pipe(
      tap(_ => console.log(`fetched article id=${id}`)),
      catchError(this.handleError<Article>(`getArticleById id=${id}`))
    );
  }

  addArticle(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(apiUrl, article, httpOptions).pipe(
      tap((a: Article) => console.log(`added article w/ id=${a._id}`)),
      catchError(this.handleError<Article>('addArticle'))
    );
  }



  updateArticle(id: string, article: Article): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
    };
  }

}
