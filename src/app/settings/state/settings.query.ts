import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { SettingsStore, SettingsState } from './settings.store';

@Injectable({ providedIn: 'root' })
export class SettingsQuery extends Query<SettingsState> {
  constructor(protected store: SettingsStore) {
    super(store);
  }
}
