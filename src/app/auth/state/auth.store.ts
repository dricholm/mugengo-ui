import { Injectable } from '@angular/core';
import { Store, StoreConfig, action } from '@datorama/akita';

import { TokenResponse, JwtPayload } from '@app/auth/interfaces';

export interface AuthState {
  accessToken: string;
  error: number;
  jwtPayload: JwtPayload;
  loading: boolean;
  refreshToken: string;
  success: boolean;
}

export function createInitialState(): AuthState {
  return {
    accessToken: null,
    error: null,
    jwtPayload: null,
    loading: false,
    refreshToken: null,
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

  @action({ type: 'Token' })
  token(accessToken: string, refreshToken: string, jwtPayload: JwtPayload) {
    this.update({
      accessToken,
      error: null,
      jwtPayload,
      loading: false,
      refreshToken,
      success: true,
    });
  }
}
