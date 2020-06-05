import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Article } from './article';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.production ? '/api/articles/' : 'http://localhost:3000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(apiUrl)
    .pipe(
      catchError(this.handleError('getAll', []))
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
