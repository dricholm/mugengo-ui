import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService, AuthStore } from '@app/auth/state';
import { TokenResponse, JwtPayload } from '@app/auth/interfaces';

describe('AuthService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, AuthStore],
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should join', inject(
    [AuthService, AuthStore],
    (authService: AuthService, authStore: AuthStore) => {
      spyOn(authStore, 'startQuery');
      spyOn(authStore, 'error');
      spyOn(authStore, 'success');
      authService
        .join$({
          email: 'user@mugengo.com',
          name: 'Username',
          password: 'password',
        })
        .subscribe({
          complete: () => {
            expect(authStore.error).toHaveBeenCalledTimes(0);
            expect(authStore.success).toHaveBeenCalledTimes(1);
          },
        });
      expect(authStore.startQuery).toHaveBeenCalledTimes(1);
      httpMock.expectOne('auth/register').flush({});
    }
  ));

  it('should set error in join', inject(
    [AuthService, AuthStore],
    (authService: AuthService, authStore: AuthStore) => {
      spyOn(authStore, 'startQuery');
      spyOn(authStore, 'error');
      spyOn(authStore, 'success');
      authService
        .join$({
          email: 'user@mugengo.com',
          name: 'Username',
          password: 'password',
        })
        .subscribe({
          complete: () => {
            expect(authStore.error).toHaveBeenCalledWith(500);
            expect(authStore.success).toHaveBeenCalledTimes(0);
          },
        });
      expect(authStore.startQuery).toHaveBeenCalledTimes(1);
      httpMock
        .expectOne('auth/register')
        .error(new ErrorEvent('Test error'), { status: 500 });
    }
  ));

  it('should sign in', inject(
    [AuthService, AuthStore],
    (authService: AuthService, authStore: AuthStore) => {
      spyOn(authStore, 'startQuery');
      spyOn(authStore, 'error');
      spyOn(authStore, 'token');
      const response: TokenResponse = {
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
          'eyJlbWFpbCI6InVzZXJAbXVnZW5nby5jb20iLCJleHAiOjYwMCwiaWF0IjoxMDB9.' +
          'Z-9D_0jRCRlhEk3MNQNHddWxLGBHCeqvo4sr3uB3Upw',
        expires_in: 500,
        refresh_token: 'refreshToken',
        token_type: 'bearer',
      };
      const jwtPayload: JwtPayload = {
        email: 'user@mugengo.com',
        exp: 600,
        iat: 100,
      };
      authService
        .token$({
          email: 'user@mugengo.com',
          grant_type: 'password',
          password: 'password',
        })
        .subscribe({
          complete: () => {
            expect(authStore.error).toHaveBeenCalledTimes(0);
            expect(authStore.token).toHaveBeenCalledWith(
              response.access_token,
              response.refresh_token,
              jwtPayload
            );
          },
        });
      expect(authStore.startQuery).toHaveBeenCalledTimes(1);
      httpMock.expectOne('auth/token').flush(response);
    }
  ));
});
