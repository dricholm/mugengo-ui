import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserDataService } from './user-data.service';
import { SearchRequest } from '../interfaces';
import { User } from '../state';

describe('UserDataService', () => {
  let service: UserDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserDataService],
    });
    const injector: TestBed = getTestBed();
    service = injector.get(UserDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should search users', () => {
    const request: SearchRequest = {
      country: 'HU',
      fromAge: 22,
      languages: [],
      name: null,
      toAge: 28,
    };
    const users: Array<User> = [
      {
        age: 23,
        country: 'US',
        id: 1,
        languages: [{ code: 'en', level: 4 }],
        name: 'User one',
      },
    ];

    service.search$(request).subscribe((result: Array<User>) => {
      expect(result).toEqual(users);
    });
    const req = httpMock.expectOne('user/search');
    expect(req.request.method).toEqual('POST');
    req.flush(users);
  });
});
