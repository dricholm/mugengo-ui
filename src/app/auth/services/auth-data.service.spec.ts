import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AuthDataService } from './auth-data.service';
import { JoinForm } from '@app/auth/interfaces';

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

  it('should send out data in case of join', () => {
    const data: JoinForm = {
      email: 'user@mugengo.com',
      name: 'User name',
      password: 'password',
    };

    service.join(data).subscribe();
    const req = httpMock.expectOne('auth/register');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });
});
