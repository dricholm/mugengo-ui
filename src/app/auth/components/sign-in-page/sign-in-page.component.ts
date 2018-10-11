import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { skip } from 'rxjs/operators';

import { AuthQuery, AuthService } from '@app/auth/state';
import { SignInForm } from '@app/auth/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-sign-in-page',
  templateUrl: './sign-in-page.component.html',
})
export class SignInPageComponent {
  constructor(
    private authQuery: AuthQuery,
    private authService: AuthService,
    private router: Router
  ) {}

  error$ = this.authQuery.select(({ error }) => error).pipe(skip(1));
  loading$ = this.authQuery.select(({ loading }) => loading);

  onSubmit(data: SignInForm) {
    this.authService
      .token$({ ...data, grant_type: 'password' })
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }
}
