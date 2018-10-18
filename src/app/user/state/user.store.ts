import { Injectable } from '@angular/core';
import {
  EntityState,
  EntityStore,
  StoreConfig,
  action,
  getInitialActiveState,
} from '@datorama/akita';

import { User } from './user.model';

export interface UserState extends EntityState<User> {
  error: number;
  loading: boolean;
}

export function createInitialState(): UserState {
  return {
    error: null,
    loading: false,
    ...getInitialActiveState(),
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super(createInitialState());
  }

  @action({ type: 'Start query' })
  startQuery() {
    this.updateRoot({ error: null, loading: true, success: false });
  }
}
