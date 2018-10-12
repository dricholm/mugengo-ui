import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthService, AuthStore } from '@app/auth/state';
import { TokenResponse, JwtPayload } from '@app/auth/interfaces';
import { StorageService } from '@app/core/services/storage.service';

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

  it('should init store with storage tokens', inject(
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      const accessToken: string =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
        'eyJlbWFpbCI6InVzZXJAbXVnZW5nby5jb20iLCJleHAiOjYwMCwiaWF0IjoxMDB9.' +
        'Z-9D_0jRCRlhEk3MNQNHddWxLGBHCeqvo4sr3uB3Upw';
      const refreshToken = 'refreshToken';
      const jwtPayload: JwtPayload = {
        email: 'user@mugengo.com',
        exp: 600,
        iat: 100,
      };
      spyOnProperty(storageService, 'accessToken', 'get').and.returnValue(
        accessToken
      );
      spyOnProperty(storageService, 'refreshToken', 'get').and.returnValue(
        refreshToken
      );
      spyOn(authStore, 'token');

      authService.init();
      expect(authStore.token).toHaveBeenCalledWith(
        accessToken,
        refreshToken,
        jwtPayload
      );
    }
  ));

  it('should not set token in store when it is not in storage', inject(
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      spyOnProperty(storageService, 'accessToken', 'get').and.returnValue(null);
      spyOnProperty(storageService, 'refreshToken', 'get').and.returnValue(
        null
      );
      spyOn(authStore, 'token');

      authService.init();
      expect(authStore.token).toHaveBeenCalledTimes(0);
    }
  ));

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
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      const accessSpy = spyOnProperty(storageService, 'accessToken', 'set');
      const refreshSpy = spyOnProperty(storageService, 'refreshToken', 'set');
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
            expect(accessSpy).toHaveBeenCalledWith(response.access_token);
            expect(refreshSpy).toHaveBeenCalledWith(response.refresh_token);
          },
        });
      expect(authStore.startQuery).toHaveBeenCalledTimes(1);
      httpMock.expectOne('auth/token').flush(response);
    }
  ));

  it('should set error in sign in', inject(
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      const accessSpy = spyOnProperty(storageService, 'accessToken', 'set');
      const refreshSpy = spyOnProperty(storageService, 'refreshToken', 'set');
      spyOn(authStore, 'startQuery');
      spyOn(authStore, 'error');
      spyOn(authStore, 'token');

      authService
        .token$({
          email: 'user@mugengo.com',
          grant_type: 'password',
          password: 'password',
        })
        .subscribe({
          complete: () => {
            expect(authStore.error).toHaveBeenCalledWith(400);
            expect(authStore.token).toHaveBeenCalledTimes(0);
            expect(accessSpy).toHaveBeenCalledTimes(0);
            expect(refreshSpy).toHaveBeenCalledTimes(0);
          },
        });
      expect(authStore.startQuery).toHaveBeenCalledTimes(1);
      httpMock
        .expectOne('auth/token')
        .error(new ErrorEvent('Error'), { status: 400 });
    }
  ));

  it('should sign out', inject(
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      const accessSpy = spyOnProperty(storageService, 'accessToken', 'set');
      const refreshSpy = spyOnProperty(storageService, 'refreshToken', 'set');
      spyOn(authStore, 'signOut');

      authService.signOut();
      expect(authStore.signOut).toHaveBeenCalledTimes(1);
      expect(accessSpy).toHaveBeenCalledWith(null);
      expect(refreshSpy).toHaveBeenCalledWith(null);
      httpMock.expectOne('auth/logout').flush({});
    }
  ));

  it('should sign out even in case of error', inject(
    [AuthService, AuthStore, StorageService],
    (
      authService: AuthService,
      authStore: AuthStore,
      storageService: StorageService
    ) => {
      const accessSpy = spyOnProperty(storageService, 'accessToken', 'set');
      const refreshSpy = spyOnProperty(storageService, 'refreshToken', 'set');
      spyOn(authStore, 'signOut');

      authService.signOut();
      expect(authStore.signOut).toHaveBeenCalledTimes(1);
      expect(accessSpy).toHaveBeenCalledWith(null);
      expect(refreshSpy).toHaveBeenCalledWith(null);
      httpMock
        .expectOne('auth/logout')
        .error(new ErrorEvent('Error'), { status: 500 });
    }
  ));
});
