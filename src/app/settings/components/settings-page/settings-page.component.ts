import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
  query,
  group,
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
  selector: 'mgg-settings-page',
  templateUrl: './settings-page.component.html',
})
export class SettingsPageComponent {}
