import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { User } from '@app/user/state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-user-cards',
  styleUrls: ['./user-cards.component.scss'],
  templateUrl: './user-cards.component.html',
})
export class UserCardsComponent {
  @Input()
  users: Array<User>;
}
