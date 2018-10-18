import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UserService, UserStore } from './';
import { SearchRequest } from '../interfaces';

describe('UserService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, UserStore],
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set users if search is successful', inject(
    [UserService, UserStore],
    (service: UserService, store: UserStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'setLoading');
      spyOn(store, 'setError');
      spyOn(store, 'set');

      const data: Partial<SearchRequest> = {
        name: 'Name',
      };

      service.search$(data).subscribe({
        complete: () => {
          expect(store.set).toHaveBeenCalledTimes(1);
          expect(store.setError).toHaveBeenCalledTimes(0);
          expect(store.setLoading).toHaveBeenCalledTimes(0);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      httpMock.expectOne('user/search').flush(data);
    }
  ));

  it('should set error if search is unsuccessful', inject(
    [UserService, UserStore],
    (service: UserService, store: UserStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'setLoading');
      spyOn(store, 'setError');
      spyOn(store, 'set');

      const data: Partial<SearchRequest> = {
        name: 'Name',
      };

      service.search$(data).subscribe({
        complete: () => {
          expect(store.set).toHaveBeenCalledTimes(0);
          expect(store.setError).toHaveBeenCalledWith(401);
          expect(store.setLoading).toHaveBeenCalledWith(false);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      httpMock
        .expectOne('user/search')
        .error(new ErrorEvent('Error'), { status: 401 });
    }
  ));
});
