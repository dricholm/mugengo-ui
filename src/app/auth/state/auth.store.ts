import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';

export interface AuthState {
  error: number;
  loading: boolean;
  success: boolean;
}

export function createInitialState(): AuthState {
  return {
    error: null,
    loading: false,
    success: false,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<AuthState> {
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
}
