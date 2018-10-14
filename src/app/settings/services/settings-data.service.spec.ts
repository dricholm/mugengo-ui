import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { SettingsDataService } from './settings-data.service';
import { Profile } from '../interfaces';

describe('SettingsDataService', () => {
  let service: SettingsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsDataService],
    });
    const injector: TestBed = getTestBed();
    service = injector.get(SettingsDataService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get profile info', async () => {
    const data: Profile = {
      age: 22,
      country: 'ts',
      languages: [{ code: 'lc', level: 1 }],
      name: 'User name',
    };

    service.getProfile$().subscribe((profile: Profile) => {
      expect(profile).toBe(data);
    });
    const req = httpMock.expectOne('settings/profile');
    expect(req.request.method).toEqual('GET');
    req.flush(data);
  });

  it('should update profile info', async () => {
    const data: Profile = {
      age: 22,
      country: 'test',
      languages: [{ code: 'lc', level: 2 }],
      name: 'User name',
    };

    service.updateProfile$(data).subscribe();
    const req = httpMock.expectOne('settings/profile');
    expect(req.request.method).toEqual('PATCH');
    req.flush({});
  });
});
