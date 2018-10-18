import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  CountryQuery,
  LanguageQuery,
  Country,
  Language,
} from '@app/core/state';
import { UserService } from '@app/user/state/user.service';
import { SearchRequest } from '@app/user/interfaces';
import { User, UserQuery } from '@app/user/state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-user-search-page',
  templateUrl: './user-search-page.component.html',
})
export class UserSearchPageComponent {
  constructor(
    private countryQuery: CountryQuery,
    private languageQuery: LanguageQuery,
    private userService: UserService,
    private userQuery: UserQuery
  ) {}

  countries$: Observable<Array<Country>> = this.countryQuery.selectAll({
    sortBy: 'name',
  });
  languages$: Observable<Array<Language>> = this.languageQuery.selectAll({
    sortBy: 'name',
  });

  usersResult$: Observable<Array<User>> = this.userQuery.selectAll();
  loading$: Observable<boolean> = this.userQuery.selectLoading();
  error$: Observable<number> = this.userQuery.selectError();

  onSubmit(data: Partial<SearchRequest>) {
    this.userService.search$(data).subscribe();
  }
}
