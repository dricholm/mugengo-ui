import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { Observable } from 'rxjs';

import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  loggedIn$: Observable<boolean> = this.select(
    ({ accessToken, jwtPayload, refreshToken }) =>
      toBoolean(accessToken && jwtPayload && refreshToken)
  );

  get accessToken(): string {
    return this.getSnapshot().accessToken;
  }
}
