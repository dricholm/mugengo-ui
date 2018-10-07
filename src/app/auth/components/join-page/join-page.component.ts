import { Component, ChangeDetectionStrategy } from '@angular/core';

import { JoinRequest } from '@app/auth/interfaces';
import { AuthQuery, AuthService } from '@app/auth/state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-join-page',
  templateUrl: './join-page.component.html',
})
export class JoinPageComponent {
  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  error$ = this.authQuery.error$;
  loading$ = this.authQuery.loading$;
  success$ = this.authQuery.success$;

  onSubmit(data: JoinRequest) {
    this.authService.join$(data).subscribe();
  }
}
