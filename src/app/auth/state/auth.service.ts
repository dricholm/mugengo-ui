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
import { StorageService } from '@app/core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private authDataService: AuthDataService,
    private storageService: StorageService
  ) {}

  init() {
    if (!this.storageService.accessToken || !this.storageService.refreshToken) {
      return;
    }

    const jwtPayload: JwtPayload = jwtDecode(this.storageService.accessToken);
    this.authStore.token(
      this.storageService.accessToken,
      this.storageService.refreshToken,
      jwtPayload
    );
  }

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
        this.storageService.accessToken = response.access_token;
        this.storageService.refreshToken = response.refresh_token;
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.authStore.error(error.status);
        return of();
      })
    );
  }

  signOut() {
    this.authDataService
      .signOut$({ refreshToken: this.storageService.refreshToken })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error during Sign Out request', error);
          return of(null);
        })
      )
      .subscribe();
    this.authStore.signOut();
    this.storageService.accessToken = null;
    this.storageService.refreshToken = null;
  }
}
