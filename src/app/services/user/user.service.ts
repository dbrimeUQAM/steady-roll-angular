import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { User } from './user';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.production ? '/api/users/' : 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(apiUrl)
    .pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getUserById(id: string): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<User>(url).pipe(
      tap(_ => console.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUserById id=${id}`))
    );
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(apiUrl, user, httpOptions);
    /*.pipe(
      tap((u: User) => console.log(`added user w/ id=${u._id}`)),
      catchError(this.handleError<User>('addUser'))
    );*/
  }

  updateUser(id: string, user: User): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`updated user id=${id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  deleteUser(id: string): Observable<User> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete<User>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  activateUser(id: string): Observable<any> {
    const url = `${apiUrl}/${id}/activate`;
    return this.httpClient.put(url, httpOptions).pipe(
      tap(_ => console.log(`activated user id=${id}`)),
      catchError(this.handleError<User>(`activated user id=${id}`))
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
