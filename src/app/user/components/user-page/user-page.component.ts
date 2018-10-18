import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  trigger,
  transition,
  query,
  group,
  useAnimation,
} from '@angular/animations';

import { fadeInAnimation, scaleUpAnimation } from '@app/shared/animations';

@Component({
  animations: [
    trigger('router', [
      transition('* => *', [
        query(
          ':enter',
          group([
            useAnimation(fadeInAnimation, { params: { time: '300ms 250ms' } }),
            useAnimation(scaleUpAnimation, {
              params: { from: 0.95, time: '300ms 250ms' },
            }),
          ]),
          { optional: true }
        ),
      ]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-user-page',
  templateUrl: './user-page.component.html',
})
export class UserPageComponent {}
