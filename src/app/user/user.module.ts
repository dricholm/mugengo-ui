import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { SharedModule } from '@app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { UserSearchPageComponent } from './components/user-search-page/user-search-page.component';
import { UserSearchFormComponent } from './components/user-search-form/user-search-form.component';
import { UserCardsComponent } from './components/user-cards/user-cards.component';

@NgModule({
  declarations: [
    UserPageComponent,
    UserNavComponent,
    UserSearchPageComponent,
    UserSearchFormComponent,
    UserCardsComponent,
  ],
  imports: [CommonModule, UserRoutingModule, SharedModule, TypeaheadModule],
})
export class UserModule {}
