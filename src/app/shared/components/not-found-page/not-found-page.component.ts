import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-not-found-page',
  styleUrls: ['./not-found-page.component.scss'],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
