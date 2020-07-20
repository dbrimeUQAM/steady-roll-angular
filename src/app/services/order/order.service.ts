import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

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

  getAll(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(apiUrl)
    .pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getOrderById(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<Order>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrderById id=${id}`))
    );
  }

  getCurrentOrder(userId: string): Observable<Order> {
    const url = `${apiUrl}/user/${userId}/in-progress`;
    return this.httpClient.get<Order>(url).pipe(
      tap(_ => console.log(`fetched order by userId=${userId}`)),
      catchError(this.handleError<Order>(`getCurrentOrder userId=${userId}`))
    );
  }

  getAllByUserId(userId: string): Observable<Order[]> {
    const url = `${apiUrl}/user/${userId}`;
    return this.httpClient.get<Order[]>(url)
    .pipe(
      catchError(this.handleError('getAllByUserId', []))
    );
  }

  addArticleToOrder(userId: string, articleId: string, qty: number): Observable<any> {
    const url = `${apiUrl}/user/${userId}/add-article`;
    return this.httpClient.post(url, { articleId, qty }, httpOptions).pipe(
      tap(_ => console.log(`added article to order for user id=${userId}`)),
      catchError(this.handleError<any>('addArticleToOrder'))
    );
  }

  deleteOrder(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete<Order>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  cancelOrder(id: string): Observable<Order> {
    const url = `${apiUrl}/${id}/cancel`;
    return this.httpClient.put<Order>(url, httpOptions).pipe(
      tap(_ => console.log(`cancelled order id=${id}`)),
      catchError(this.handleError<Order>('cancelOrder'))
    );
  }

  deleteAllArticles(userId: string): Observable<Order> {
    const url = `${apiUrl}/user/${userId}/delete-articles`;
    return this.httpClient.put(url, httpOptions).pipe(
      tap(_ => console.log(`delete articles in order for user id=${userId}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  updateOrder(id: string, order: Order): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, order, httpOptions).pipe(
      tap(_ => console.log(`updated order id=${id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }


  deleteArticle(userId: string, articleId: string): Observable<Order> {
    const url = `${apiUrl}/user/${userId}/delete-article/${articleId}`;
    return this.httpClient.put(url, httpOptions).pipe(
      tap(_ => console.log(`deleted article for userId=${userId}`)),
      catchError(this.handleError<any>('deleteArticle'))
    );
  }

  updateArticleById(userId: string, articleId: string, qty: number): Observable<any> {
    const url = `${apiUrl}/user/${userId}/update-article/${articleId}`;
    return this.httpClient.put(url, { articleId, qty }, httpOptions).pipe(
      tap(_ => console.log(`updated article id=${articleId}`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  updateArticleQtyById(userId: string, articleId: string, qty: number): Observable<any> {
    const url = `${apiUrl}/user/${userId}/update-article-qty/${articleId}`;
    return this.httpClient.put(url, { qty }, httpOptions).pipe(
      tap(_ => console.log(`updated article qty for id=${articleId}`)),
      catchError(this.handleError<any>('updateArticleQtyById'))
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
