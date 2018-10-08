import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';

import { GuestGuard } from './guest.guard';
import { AuthQuery } from '@app/auth/state';

describe('GuestGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [GuestGuard],
    });
  });

  it('should return true if not logged in', inject(
    [GuestGuard, AuthQuery, Router],
    (guestGuard: GuestGuard, authQuery: AuthQuery, router: Router) => {
      authQuery.loggedIn$ = of(false);
      spyOn(router, 'navigateByUrl');
      (guestGuard.canActivate(null, null) as Observable<boolean>).subscribe(
        (result: boolean) => {
          expect(result).toBe(true);
          expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
        }
      );
    }
  ));

  it('should return false if logged in', inject(
    [GuestGuard, AuthQuery, Router],
    (guestGuard: GuestGuard, authQuery: AuthQuery, router: Router) => {
      authQuery.loggedIn$ = of(true);
      spyOn(router, 'navigateByUrl');
      (guestGuard.canActivate(null, null) as Observable<boolean>).subscribe(
        (result: boolean) => {
          expect(result).toBe(false);
          expect(router.navigateByUrl).toHaveBeenCalledWith('/home');
        }
      );
    }
  ));
});
