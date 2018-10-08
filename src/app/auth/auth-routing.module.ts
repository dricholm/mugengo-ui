import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from '@app/auth/components/sign-in-page/sign-in-page.component';
import { JoinPageComponent } from '@app/auth/components/join-page/join-page.component';
import { SignOutComponent } from '@app/auth/components/sign-out/sign-out.component';
import { GuestGuard } from '@app/auth/guards/guest.guard';
import { AuthGuard } from '@app/auth/guards/auth.guard';

const routes: Routes = [
  {
    canActivate: [GuestGuard],
    component: SignInPageComponent,
    path: 'sign-in',
  },
  {
    canActivate: [GuestGuard],
    component: JoinPageComponent,
    path: 'join',
  },
  {
    canActivate: [AuthGuard],
    component: SignOutComponent,
    path: 'sign-out',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
