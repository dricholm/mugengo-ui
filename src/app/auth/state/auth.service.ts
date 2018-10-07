import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';

import { AuthStore } from './auth.store';
import {
  JoinRequest,
  TokenRequest,
  TokenResponse,
  JwtPayload,
} from '@app/auth/interfaces';
import { AuthDataService } from '@app/auth/services/auth-data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private authDataService: AuthDataService
  ) {}

  join$(data: JoinRequest): Observable<void> {
    this.authStore.startQuery();
    return this.authDataService.join$(data).pipe(
      map(() => {
        this.authStore.success();
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.authStore.error(error.status);
        return of();
      })
    );
  }

  token$(data: TokenRequest): Observable<void> {
    this.authStore.startQuery();
    return this.authDataService.token$(data).pipe(
      map((response: TokenResponse) => {
        const jwtPayload: JwtPayload = jwtDecode(response.access_token);
        this.authStore.token(
          response.access_token,
          response.refresh_token,
          jwtPayload
        );
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.authStore.error(error.status);
        return of();
      })
    );
  }
}
