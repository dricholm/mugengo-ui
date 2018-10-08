import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/auth/state';

@Component({
  selector: 'mgg-sign-out',
  template: '',
})
export class SignOutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.signOut();
    this.router.navigateByUrl('/');
  }
}
