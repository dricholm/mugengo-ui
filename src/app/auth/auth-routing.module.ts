import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInPageComponent } from '@app/auth/components/sign-in-page/sign-in-page.component';
import { JoinPageComponent } from '@app/auth/components/join-page/join-page.component';

const routes: Routes = [
  {
    component: SignInPageComponent,
    path: 'sign-in',
  },
  {
    component: JoinPageComponent,
    path: 'join',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}
