import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [AuthGuard],
    loadChildren: '@app/settings/settings.module#SettingsModule',
    path: 'settings',
  },
  {
    canActivate: [AuthGuard],
    loadChildren: '@app/users/users.module#UsersModule',
    path: 'users',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}
