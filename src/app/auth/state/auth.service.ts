import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { AuthStore } from './auth.store';
import { JoinForm } from '@app/auth/interfaces';
import { AuthDataService } from '@app/auth/services/auth-data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private authStore: AuthStore,
    private authDataService: AuthDataService
  ) {}

  join(data: JoinForm): Observable<any> {
    this.authStore.startQuery();
    return this.authDataService.join(data).pipe(
      tap(() => {
        this.authStore.success();
      }),
      catchError((error: HttpErrorResponse) => {
        this.authStore.error(error.status);
        return of(false);
      })
    );
  }
}
