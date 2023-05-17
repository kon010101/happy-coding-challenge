import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@happy-coding-challenge/types';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getUsers() {
    return this._http.get(`${environment.apiUrl}/users`);
  }

  createUser(data: User) {
    return this._http.post(`${environment.apiUrl}/user`, data);
  }

  deleteUser(id: string) {}

  updateUser(id: string, data: Partial<User>) {}
}
