import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Profile } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class SettingsDataService {
  constructor(private httpClient: HttpClient) {}

  getProfile$(): Observable<Profile> {
    return this.httpClient.get<Profile>('settings/profile');
  }

  updateProfile$(data: Profile): Observable<Object> {
    return this.httpClient.patch<Object>('settings/profile', data);
  }
}
