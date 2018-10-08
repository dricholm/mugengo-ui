import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { AuthorizationInterceptor } from './authorization.interceptor';
import { environment } from '@env/environment';
import { AuthQuery } from '@app/auth/state';

describe(`AuthorizationInterceptor`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          multi: true,
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
        },
      ],
    });
  });

  afterEach(inject(
    [HttpTestingController],
    (httpMock: HttpTestingController) => {
      httpMock.verify();
    }
  ));

  it('should add Authorization header to API URLs', inject(
    [HttpClient, HttpTestingController, AuthQuery],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery
    ) => {
      spyOnProperty(authQuery, 'accessToken').and.returnValue(
        'accessTokenTest'
      );
      http.get(`${environment.apiUrl}test-route`).subscribe();

      const request: TestRequest = httpMock.expectOne(
        `${environment.apiUrl}test-route`
      );
      expect(request.request.headers.has('Authorization')).toBe(true);
      expect(request.request.headers.get('Authorization')).toBe(
        'Bearer accessTokenTest'
      );
      request.flush({});
    }
  ));

  it('should not add Authorization header when Access Token is null', inject(
    [HttpClient, HttpTestingController, AuthQuery],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery
    ) => {
      spyOnProperty(authQuery, 'accessToken').and.returnValue(null);
      http.get(`${environment.apiUrl}test-route`).subscribe();

      const request: TestRequest = httpMock.expectOne(
        `${environment.apiUrl}test-route`
      );
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    }
  ));

  it('should not prefix absolute URL', inject(
    [HttpClient, HttpTestingController, AuthQuery],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery
    ) => {
      spyOnProperty(authQuery, 'accessToken').and.returnValue(
        'accessTokenTest'
      );
      http.get('https://mugengo.com/absolute').subscribe();

      const request: TestRequest = httpMock.expectOne(
        'https://mugengo.com/absolute'
      );
      expect(request.request.headers.has('Authorization')).toBe(false);
      request.flush({});
    }
  ));
});
