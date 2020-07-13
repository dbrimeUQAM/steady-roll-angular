import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { throwError, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Hospital } from './hospital';

import { environment } from '../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = environment.production ? '/api/hospitals/' : 'http://localhost:3000/api/hospitals';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Hospital[]> {
    const url = apiUrl;
    return this.httpClient.get<Hospital[]>(url)
    .pipe(
      catchError(this.handleError('getAll', []))
    );
  }

  getHospitalById(id: string): Observable<Hospital> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.get<Hospital>(url).pipe(
      tap(_ => console.log(`fetched hospital id=${id}`)),
      catchError(this.handleError<Hospital>(`getHospitalById id=${id}`))
    );
  }

  addHospital(hospital: Hospital): Observable<Hospital> {
    return this.httpClient.post<Hospital>(apiUrl, hospital, httpOptions).pipe(
      tap((a: Hospital) => console.log(`added hospital w/ id=${a._id}`)),
      catchError(this.handleError<Hospital>('addHospital'))
    );
  }

  updateHospital(id: string, hospital: Hospital): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.put(url, hospital, httpOptions).pipe(
      tap(_ => console.log(`updated hospital id=${id}`)),
      catchError(this.handleError<any>('updateHospital'))
    );
  }

  deleteHospital(id: string): Observable<Hospital> {
    const url = `${apiUrl}/${id}`;
    return this.httpClient.delete<Hospital>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted hospital id=${id}`)),
      catchError(this.handleError<Hospital>('deleteHospital'))
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

