import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { AuthenticationService } from '../services/auth.service';
import { LoginResult } from '@happy-coding-challenge/types';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<LoginResult>,
    next: HttpHandler
  ): Observable<HttpEvent<LoginResult>> {
    // add auth header with jwt if user is logged in and request is to the api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = user?.access_token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
    }

    return next.handle(request);
  }
}
