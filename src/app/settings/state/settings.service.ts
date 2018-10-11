import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { SettingsStore } from './settings.store';
import { SettingsDataService } from '../services/settings-data.service';
import { Profile } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  constructor(
    private settingsStore: SettingsStore,
    private settingsDataService: SettingsDataService
  ) {}

  getProfile$(): Observable<void> {
    this.settingsStore.startQuery();
    this.settingsStore.setProfile(null);
    return this.settingsDataService.getProfile$().pipe(
      map((profile: Profile) => {
        this.settingsStore.setProfile(profile);
        this.settingsStore.setLoading(false);
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.settingsStore.error(error.status);
        return of(null);
      })
    );
  }

  updateProfile$(data: Profile): Observable<void> {
    this.settingsStore.startQuery();
    return this.settingsDataService.updateProfile$(data).pipe(
      map(() => {
        this.settingsStore.success();
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        this.settingsStore.error(error.status);
        return of(null);
      })
    );
  }
}
