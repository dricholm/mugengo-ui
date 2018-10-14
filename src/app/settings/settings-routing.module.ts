import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPageComponent } from './components/settings-page/settings-page.component';
import { ProfileSettingsPageComponent } from './components/profile-settings-page/profile-settings-page.component';

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
