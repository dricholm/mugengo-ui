import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SettingsService, SettingsStore } from './';
import { Profile } from '../interfaces';

describe('SettingsService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService, SettingsStore],
    });
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should set profile during get', inject(
    [SettingsService, SettingsStore],
    (service: SettingsService, store: SettingsStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'setProfile');
      spyOn(store, 'setLoading');
      spyOn(store, 'error');

      const data: Profile = { age: 12, country: 'test', name: 'Name' };

      service.getProfile$().subscribe({
        complete: () => {
          expect(store.setProfile).toHaveBeenCalledWith(data);
          expect(store.setLoading).toHaveBeenCalledTimes(1);
          expect(store.error).toHaveBeenCalledTimes(0);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      expect(store.setProfile).toHaveBeenCalledWith(null);
      httpMock.expectOne('settings/profile').flush(data);
    }
  ));

  it('should set error when getting profile', inject(
    [SettingsService, SettingsStore],
    (service: SettingsService, store: SettingsStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'setProfile');
      spyOn(store, 'setLoading');
      spyOn(store, 'error');

      service.getProfile$().subscribe({
        complete: () => {
          expect(store.setLoading).toHaveBeenCalledTimes(0);
          expect(store.error).toHaveBeenCalledWith(401);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      expect(store.setProfile).toHaveBeenCalledWith(null);
      httpMock
        .expectOne('settings/profile')
        .error(new ErrorEvent('Error'), { status: 401 });
    }
  ));

  it('should update profile', inject(
    [SettingsService, SettingsStore],
    (service: SettingsService, store: SettingsStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'success');
      spyOn(store, 'error');

      const data: Profile = { age: 12, country: 'test', name: 'Name' };

      service.updateProfile$(data).subscribe({
        complete: () => {
          expect(store.success).toHaveBeenCalledTimes(1);
          expect(store.error).toHaveBeenCalledTimes(0);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      httpMock.expectOne('settings/profile').flush({});
    }
  ));

  it('should set error on update profile', inject(
    [SettingsService, SettingsStore],
    (service: SettingsService, store: SettingsStore) => {
      spyOn(store, 'startQuery');
      spyOn(store, 'success');
      spyOn(store, 'error');

      const data: Profile = { age: 12, country: 'test', name: 'Name' };

      service.updateProfile$(data).subscribe({
        complete: () => {
          expect(store.success).toHaveBeenCalledTimes(0);
          expect(store.error).toHaveBeenCalledWith(500);
        },
      });
      expect(store.startQuery).toHaveBeenCalledTimes(1);
      httpMock
        .expectOne('settings/profile')
        .error(new ErrorEvent('Error'), { status: 500 });
    }
  ));
});
