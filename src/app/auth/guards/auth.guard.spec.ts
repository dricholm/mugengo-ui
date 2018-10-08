import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { AuthGuard } from './auth.guard';
import { AuthQuery } from '@app/auth/state';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthGuard],
    });
  });

  it('should return true if logged in', inject(
    [AuthGuard, AuthQuery, Router],
    (authGuard: AuthGuard, authQuery: AuthQuery, router: Router) => {
      authQuery.loggedIn$ = of(true);
      spyOn(router, 'navigateByUrl');
      (authGuard.canActivate(null, null) as Observable<boolean>).subscribe(
        (result: boolean) => {
          expect(result).toBe(true);
          expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
        }
      );
    }
  ));

  it('should return false if not logged in', inject(
    [AuthGuard, AuthQuery, Router],
    (authGuard: AuthGuard, authQuery: AuthQuery, router: Router) => {
      authQuery.loggedIn$ = of(false);
      spyOn(router, 'navigateByUrl');
      (authGuard.canActivate(null, null) as Observable<boolean>).subscribe(
        (result: boolean) => {
          expect(result).toBe(false);
          expect(router.navigateByUrl).toHaveBeenCalledWith('/sign-in');
        }
      );
    }
  ));
});
