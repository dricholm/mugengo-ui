import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-user-nav',
  templateUrl: './user-nav.component.html',
})
export class UserNavComponent {}
