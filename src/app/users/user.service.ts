import { Injectable } from '@angular/core';
import { User } from './user';
import { Http, Response } from '@angular/http';

@Injectable()
export class UserService {
  private usersUrl = '/api/users';

  constructor(private http: Http) {}

  getUsers(): Promise<void | User[]> {
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json() as User[])
      .catch(this.handleError);
  }

  createUser(newUser: User): Promise<void | User> {
    return this.http.post(this.usersUrl, newUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  deleteUser(userId: string): Promise<void | string> {
    return this.http.delete(this.usersUrl + '/' + userId)
      .toPromise()
      .then(response => response.json() as string)
      .catch(this.handleError);
  }

  updateUser(updatedUser: User): Promise<void | User> {
    const putUrl = this.usersUrl + '/' + updatedUser._id;
    return this.http.put(putUrl, updatedUser)
      .toPromise()
      .then(response => response.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Erreur du Serveur';
    console.error(errMsg); // log to console instead
  }

}
