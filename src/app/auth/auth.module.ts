import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { JoinPageComponent } from './components/join-page/join-page.component';
import { JoinFormComponent } from './components/join-form/join-form.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';

@NgModule({
  declarations: [JoinPageComponent, JoinFormComponent, SignInPageComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule],
})
export class AuthModule {}
