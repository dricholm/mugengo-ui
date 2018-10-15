import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-settings-nav',
  templateUrl: './settings-nav.component.html',
})
export class SettingsNavComponent {}
