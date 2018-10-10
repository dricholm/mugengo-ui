import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  trigger,
  transition,
  useAnimation,
  query,
  style,
  group,
} from '@angular/animations';
import { Observable } from 'rxjs';

import { AuthQuery, AuthService } from '@app/auth/state';
import {
  expandAnimation,
  collapseAnimation,
  fadeInAnimation,
  fadeOutAnimation,
  scaleUpAnimation,
  scaleDownAnimation,
} from './shared/animations';

@Component({
  animations: [
    trigger('nav', [
      transition(':enter', [
        useAnimation(expandAnimation, { params: { time: '200ms' } }),
      ]),
      transition(':leave', [
        useAnimation(collapseAnimation, { params: { time: '150ms' } }),
      ]),
    ]),
    trigger('router', [
      transition('* => *', [
        query(
          ':enter, :leave',
          style({
            left: 0,
            'min-height': '100%',
            position: 'absolute',
            top: 0,
            width: '100%',
          }),
          { optional: true }
        ),
        query(':enter', style({ opacity: 0 }), { optional: true }),
        query(
          ':leave',
          group([
            useAnimation(fadeOutAnimation, { params: { time: '250ms' } }),
            useAnimation(scaleDownAnimation, {
              params: { time: '250ms', to: 0.95 },
            }),
          ]),
          { optional: true }
        ),
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
  selector: 'mgg-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  loggedIn$: Observable<boolean> = this.authQuery.loggedIn$;

  ngOnInit() {
    this.authService.init();
  }
}
