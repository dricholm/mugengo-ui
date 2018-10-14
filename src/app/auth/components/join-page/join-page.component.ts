import { Component, ChangeDetectionStrategy } from '@angular/core';

import { JoinRequest } from '@app/auth/interfaces';
import { AuthQuery, AuthService } from '@app/auth/state';
import { skip } from 'rxjs/operators';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-join-page',
  templateUrl: './join-page.component.html',
})
export class JoinPageComponent {
  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  error$ = this.authQuery.select(({ error }) => error).pipe(skip(1));
  loading$ = this.authQuery.select(({ loading }) => loading);
  success$ = this.authQuery.select(({ success }) => success).pipe(skip(1));

  onSubmit(data: JoinRequest) {
    this.authService.join$(data).subscribe();
  }
}
