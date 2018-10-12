import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { ProfileSettingsPageComponent } from './components/profile-settings-page/profile-settings-page.component';
import { LanguageSettingsPageComponent } from './components/language-settings-page/language-settings-page.component';

const routes: Routes = [
  {
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        component: ProfileSettingsPageComponent,
        path: 'profile',
      },
      {
        component: LanguageSettingsPageComponent,
        path: 'language',
      },
    ],
    component: SettingsPageComponent,
    path: '',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class SettingsRoutingModule {}
