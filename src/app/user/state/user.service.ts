import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserStore } from './user.store';
import { UserDataService } from '../services/user-data.service';
import { SearchRequest } from '../interfaces';
import { User } from './user.model';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private userStore: UserStore,
    private userDataService: UserDataService
  ) {}

  search$(data: Partial<SearchRequest>): Observable<void> {
    this.userStore.startQuery();
    return this.userDataService.search$(data).pipe(
      map((result: User[]) => {
        this.userStore.set(result);
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.userStore.setError(error.status || 1);
        this.userStore.setLoading(false);
        return of(null);
      })
    );
  }
}
