import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { environment } from '@env/environment';
import { UnauthorizedInterceptor } from './unauthorized.interceptor';
import { AuthQuery, AuthService } from '../state';

describe('UnauthorizedInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          multi: true,
          provide: HTTP_INTERCEPTORS,
          useClass: UnauthorizedInterceptor,
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

  it('should retry 401 errors', inject(
    [HttpClient, HttpTestingController, AuthQuery, AuthService],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery,
      authService: AuthService
    ) => {
      const tokenSpy = spyOnProperty(
        authQuery,
        'accessToken',
        'get'
      ).and.returnValue('oldToken');
      spyOnProperty(authQuery, 'loggedIn', 'get').and.returnValue(true);

      spyOn(authService, 'token$').and.callFake(() => {
        tokenSpy.and.returnValue('newToken');
        return of(null);
      });

      http
        .get(`${environment.apiUrl}test`, {
          headers: new HttpHeaders({ Authorization: 'Bearer oldToken' }),
        })
        .subscribe(
          response => {
            expect(response).toBe('Test OK');
          },
          () => {
            fail('HTTP request failed');
          }
        );

      httpMock
        .expectOne(
          (request: HttpRequest<any>) =>
            request.headers.get('Authorization') === 'Bearer oldToken'
        )
        .error(new ErrorEvent('Not Authorized'), { status: 401 });

      httpMock
        .expectOne(
          (request: HttpRequest<any>) =>
            request.headers.get('Authorization') === 'Bearer newToken'
        )
        .flush('Test OK');
    }
  ));

  it('should not retry if not logged in', inject(
    [HttpClient, HttpTestingController, AuthQuery],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery
    ) => {
      spyOnProperty(authQuery, 'accessToken', 'get').and.returnValue(null);
      spyOnProperty(authQuery, 'loggedIn', 'get').and.returnValue(false);

      http
        .get('https://mugengo.com/test', {
          headers: new HttpHeaders({ Authorization: 'Bearer oldToken' }),
        })
        .subscribe(
          () => {
            fail('HTTP request succeeded');
          },
          () => {}
        );

      httpMock
        .expectOne(
          (request: HttpRequest<any>) =>
            request.headers.get('Authorization') === 'Bearer oldToken'
        )
        .error(new ErrorEvent('Not Authorized'), { status: 401 });
    }
  ));

  it('should not retry external urls', inject(
    [HttpClient, HttpTestingController, AuthQuery, AuthService],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery,
      authService: AuthService
    ) => {
      spyOnProperty(authQuery, 'accessToken', 'get').and.returnValue(
        'oldToken'
      );
      spyOnProperty(authQuery, 'loggedIn', 'get').and.returnValue(true);

      spyOn(authService, 'token$').and.returnValue(of(null));

      http
        .get('https://mugengo.com/test', {
          headers: new HttpHeaders({ Authorization: 'Bearer oldToken' }),
        })
        .subscribe(
          () => {
            fail('HTTP request succeeded');
          },
          () => {}
        );

      httpMock
        .expectOne(
          (request: HttpRequest<any>) =>
            request.headers.get('Authorization') === 'Bearer oldToken'
        )
        .error(new ErrorEvent('Not Authorized'), { status: 401 });
    }
  ));

  it('should throw if token does not change', inject(
    [HttpClient, HttpTestingController, AuthQuery, AuthService],
    (
      http: HttpClient,
      httpMock: HttpTestingController,
      authQuery: AuthQuery,
      authService: AuthService
    ) => {
      spyOnProperty(authQuery, 'accessToken', 'get').and.returnValue(
        'oldToken'
      );
      spyOnProperty(authQuery, 'loggedIn', 'get').and.returnValue(true);

      spyOn(authService, 'token$').and.returnValue(of(null));

      http
        .get(`${environment.apiUrl}test`, {
          headers: new HttpHeaders({ Authorization: 'Bearer oldToken' }),
        })
        .subscribe(
          () => {
            fail('HTTP request failed');
          },
          error => {
            expect(error.status).toBe(401);
          }
        );

      httpMock
        .expectOne(
          (request: HttpRequest<any>) =>
            request.headers.get('Authorization') === 'Bearer oldToken'
        )
        .error(new ErrorEvent('Not Authorized'), { status: 401 });
    }
  ));
});
