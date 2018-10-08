import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthQuery } from '@app/auth/state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authQuery: AuthQuery, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authQuery.loggedIn$.pipe(
      map((loggedIn: boolean) => {
        if (loggedIn) {
          return true;
        }
        this.router.navigateByUrl('/sign-in');
        return false;
      })
    );
  }
}
