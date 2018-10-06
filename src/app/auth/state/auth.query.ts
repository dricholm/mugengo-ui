import { Injectable } from '@angular/core';
import { Query, toBoolean } from '@datorama/akita';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { AuthStore, AuthState } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }

  error$: Observable<number> = this.select(({ error }) => error).pipe(skip(1));

  loading$: Observable<boolean> = this.select(({ loading }) =>
    toBoolean(loading)
  ).pipe(skip(1));

  success$: Observable<boolean> = this.select(({ success }) =>
    toBoolean(success)
  ).pipe(skip(1));
}
