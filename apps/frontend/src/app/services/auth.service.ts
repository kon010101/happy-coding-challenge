import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment.development';
import { LoginResult } from '@happy-coding-challenge/types';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<LoginResult | null>;
  public user: Observable<LoginResult | null>;

  constructor(private router: Router, private http: HttpClient) {
    const userItem = localStorage.getItem('user');
    this.userSubject = new BehaviorSubject(
      userItem ? JSON.parse(userItem) : {}
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject.value;
  }

  login({ email, password }: { email: string; password: string }) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          this.router.navigate(['']);

          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
