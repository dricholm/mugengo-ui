import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { SettingsRoutingModule } from './settings-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { SettingsNavComponent } from './components/settings-nav/settings-nav.component';
import { ProfileSettingsPageComponent } from './components/profile-settings-page/profile-settings-page.component';
import { ProfileSettingsFormComponent } from './components/profile-settings-form/profile-settings-form.component';

@NgModule({
  declarations: [
    SettingsPageComponent,
    SettingsNavComponent,
    ProfileSettingsPageComponent,
    ProfileSettingsFormComponent,
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule, TypeaheadModule],
})
export class SettingsModule {}
