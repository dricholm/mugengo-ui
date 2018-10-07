import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';

import { AuthDataService } from './auth-data.service';
import { JoinRequest, TokenRequest, TokenResponse } from '@app/auth/interfaces';

describe('AuthDataService', () => {
  let service: AuthDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthDataService],
    });
    const injector: TestBed = getTestBed();
    service = injector.get(AuthDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send out data in case of join', async () => {
    const data: JoinRequest = {
      email: 'user@mugengo.com',
      name: 'User name',
      password: 'password',
    };

    service.join$(data).subscribe();
    const req = httpMock.expectOne('auth/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });

  it('should send out data in case of token', async () => {
    const requestData: TokenRequest = {
      email: 'user@mugengo.com',
      grant_type: 'password',
      password: 'password',
    };

    const responseData: TokenResponse = {
      access_token: 'accessToken',
      expires_in: 7200,
      refresh_token: 'refreshToken',
      token_type: 'bearer',
    };

    service.token$(requestData).subscribe((data: TokenResponse) => {
      expect(data).toBe(responseData);
    });

    const req: TestRequest = httpMock.expectOne('auth/token');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(requestData);
    req.flush(responseData);
  });
});
