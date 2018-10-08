import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/auth/guards/auth.guard';
import { GuestGuard } from '@app/auth/guards/guest.guard';
import { LandingPageComponent } from '@app/core/components/landing-page/landing-page.component';
import { HomePageComponent } from '@app/core/components/home-page/home-page.component';

const routes: Routes = [
  {
    canActivate: [GuestGuard],
    component: LandingPageComponent,
    path: '',
  },
  {
    canActivate: [AuthGuard],
    component: HomePageComponent,
    path: 'home',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class CoreRoutingModule {}
