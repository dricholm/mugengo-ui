import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthQuery } from '@app/auth/state';
import { environment } from '@env/environment';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.startsWith(environment.apiUrl)) {
      return next.handle(request);
    }

    const token = this.authQuery.accessToken;

    if (!token) {
      return next.handle(request);
    }

    const clonedRequest = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(clonedRequest);
  }
}
