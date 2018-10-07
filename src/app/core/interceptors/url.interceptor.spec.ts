import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';

import { UrlInterceptor } from './url.interceptor';
import { environment } from '@env/environment';

describe(`UrlInterceptor`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          multi: true,
          provide: HTTP_INTERCEPTORS,
          useClass: UrlInterceptor,
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

  it('should prefix API URL', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      http.get('test-route').subscribe();

      httpMock.expectOne(`${environment.apiUrl}test-route`).flush({});
    }
  ));

  it('should not prefix absolute URL', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, httpMock: HttpTestingController) => {
      http.get('https://mugengo.com/test-route').subscribe();

      httpMock.expectOne('https://mugengo.com/test-route').flush({});
    }
  ));
});
