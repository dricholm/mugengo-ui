import { AuthStore } from '@app/auth/state';
import { JwtPayload } from '@app/auth/interfaces';

describe('AuthStore', () => {
  let store: AuthStore;

  beforeEach(() => {
    store = new AuthStore();
  });

  it('should start query', () => {
    spyOn(store, 'update');
    store.startQuery();
    expect(store.update).toHaveBeenCalledWith({
      error: null,
      loading: true,
      success: false,
    });
  });

  it('should set success', () => {
    spyOn(store, 'update');
    store.success();
    expect(store.update).toHaveBeenCalledWith({
      error: null,
      loading: false,
      success: true,
    });
  });

  it('should set error', () => {
    spyOn(store, 'update');
    store.error(123);
    expect(store.update).toHaveBeenCalledWith({
      error: 123,
      loading: false,
      success: false,
    });
  });

  it('should set token grant', () => {
    spyOn(store, 'update');
    const jwtPayload: JwtPayload = {
      email: 'user@email.com',
      exp: 500,
      iat: 100,
    };
    store.token('accessToken', 'refreshToken', jwtPayload);
    expect(store.update).toHaveBeenCalledWith({
      accessToken: 'accessToken',
      error: null,
      jwtPayload,
      loading: false,
      refreshToken: 'refreshToken',
      success: true,
    });
  });

  it('should reset authentication properties on sign out', () => {
    spyOn(store, 'update');
    store.signOut();
    expect(store.update).toHaveBeenCalledWith({
      accessToken: null,
      error: null,
      jwtPayload: null,
      loading: false,
      refreshToken: null,
      success: false,
    });
  });
});
