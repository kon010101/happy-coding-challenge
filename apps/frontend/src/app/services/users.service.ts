import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@happy-coding-challenge/types';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

const headers = new HttpHeaders().set('content-type', 'application/json');
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<any> {
    return this._http.get(`${environment.apiUrl}/users`);
  }

  getUser(id: string): Observable<any> {
    return this._http.get(`${environment.apiUrl}/users/${id}`);
  }

  createUser(data: Omit<User, 'id'>) {
    console.log({ data });
    return this._http.post(`${environment.apiUrl}/users`, data, { headers });
  }

  deleteUser(id: string) {
    return this._http.delete(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(id: string, data: Partial<User>) {
    return this._http.patch(`${environment.apiUrl}/users/${id}`, data);
  }
}
