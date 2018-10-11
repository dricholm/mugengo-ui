import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';

import { environment } from '@env/environment';
import { AuthQuery, AuthService } from '../state';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          error.url.startsWith(environment.apiUrl) &&
          error.url !== `${environment.apiUrl}/user/token`
        ) {
          const prevAuthorization = request.headers.get('Authorization');
          if (prevAuthorization == null || !this.authQuery.loggedIn) {
            return throwError(error);
          }

          const previousToken = prevAuthorization.substr(7);

          if (previousToken === this.authQuery.accessToken) {
            return this.authService
              .token$({
                grant_type: 'refresh_token',
                refresh_token: this.authQuery.refreshToken,
              })
              .pipe(
                mergeMap(() => {
                  if (previousToken === this.authQuery.accessToken) {
                    return throwError(error);
                  }

                  const retryRequest = request.clone({
                    headers: new HttpHeaders({
                      Authorization: `Bearer ${this.authQuery.accessToken}`,
                    }),
                  });

                  return next.handle(retryRequest);
                }),
                catchError(retryError => {
                  if (retryError instanceof HttpErrorResponse) {
                    return throwError(retryError);
                  }

                  return throwError(error);
                })
              );
          }
        }
        return throwError(error);
      })
    );
  }
}
