import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { skip } from 'rxjs/operators';

import { Profile } from '@app/settings/interfaces';
import {
  CountryQuery,
  Country,
  LanguageQuery,
  Language,
} from '@app/core/state';
import { SettingsQuery, SettingsService } from '@app/settings/state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-profile-settings-page',
  templateUrl: './profile-settings-page.component.html',
})
export class ProfileSettingsPageComponent implements OnInit {
  constructor(
    private countryQuery: CountryQuery,
    private languageService: LanguageQuery,
    private settingsQuery: SettingsQuery,
    private settingsService: SettingsService
  ) {}

  countries$: Observable<Array<Country>> = this.countryQuery.selectAll({
    sortBy: 'name',
  });
  languages$: Observable<Array<Language>> = this.languageService.selectAll({
    sortBy: 'name',
  });

  success$: Observable<boolean> = this.settingsQuery
    .select(state => state.success)
    .pipe(skip(1));
  error$: Observable<number> = this.settingsQuery.selectError().pipe(skip(1));
  loading$: Observable<boolean> = this.settingsQuery.selectLoading();

  profile$: Observable<Profile> = this.settingsQuery.select(
    ({ profile }) => profile
  );

  ngOnInit() {
    this.settingsService.getProfile$().subscribe();
  }

  onSubmit(profile: Profile) {
    this.settingsService.updateProfile$(profile).subscribe();
  }
}
