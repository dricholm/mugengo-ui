import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {}
