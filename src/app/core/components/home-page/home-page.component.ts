import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
