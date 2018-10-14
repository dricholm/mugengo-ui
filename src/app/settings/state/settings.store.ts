import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';

import { Profile } from '../interfaces';

export interface SettingsState {
  error: number;
  loading: boolean;
  profile: Profile;
  success: boolean;
}

export function createInitialState(): SettingsState {
  return {
    error: null,
    loading: false,
    profile: null,
    success: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'settings' })
export class SettingsStore extends Store<SettingsState> {
  constructor() {
    super(createInitialState());
  }

  @action({ type: 'Start query' })
  startQuery() {
    this.update({ error: null, loading: true, success: false });
  }

  @action({ type: 'Success' })
  success() {
    this.update({ error: null, loading: false, success: true });
  }

  @action({ type: 'Error' })
  error(error: number) {
    this.update({ error: error || 1, loading: false, success: false });
  }

  @action({ type: 'Set profile' })
  setProfile(profile: Profile) {
    this.update({ profile });
  }
}
