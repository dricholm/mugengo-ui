import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { JoinPageComponent } from './components/join-page/join-page.component';
import { JoinFormComponent } from './components/join-form/join-form.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignOutComponent } from './components/sign-out/sign-out.component';

@NgModule({
  declarations: [
    JoinPageComponent,
    JoinFormComponent,
    SignInPageComponent,
    SignInFormComponent,
    SignOutComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
