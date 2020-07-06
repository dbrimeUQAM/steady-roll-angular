import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Article } from './article';
import { Order } from './order';

import { environment } from '../../../environments/environment';

const httpOptions = {
headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.production ? '/api/orders/' : 'http://localhost:3000/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }


  getCurrentOrder(userId: string) {
    const url = `${apiUrl}/${userId}/in-progress`;
    return this.httpClient.get(url)
    .pipe(
      catchError(this.handleError('getAll', []))
    );
  }


  deleteAllArticles(userId: string): Observable<Order> {
    const url = `${apiUrl}/${userId}/delete-all`;
    return this.httpClient.put(url, userId, httpOptions).pipe(
      tap(_ => console.log(`updated order for user=Iid=${userId}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  deleteArticle(userId: string, articleId: string): Observable<Order> {
    const url = `${apiUrl}/${userId}/delete-article/${articleId}`;
    return this.httpClient.put(url, httpOptions).pipe(
      tap(_ => console.log(`updated order for user=Iid=${userId}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

//toDo
  updateArticleById(id: string, article: Article): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, article, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${id}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  addArticleToOrder(article: Article): Observable<Article> {
    return this.httpClient.post<Article>(apiUrl, article, httpOptions).pipe(
      tap((a: Article) => console.log(`added article w/ id=${a._id}`)),
      catchError(this.handleError<Article>('addArticle'))
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
