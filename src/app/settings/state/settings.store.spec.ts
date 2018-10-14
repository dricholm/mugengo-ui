import { SettingsStore } from '@app/settings/state';
import { Profile } from '../interfaces';

describe('SettingsStore', () => {
  let store: SettingsStore;

  beforeEach(() => {
    store = new SettingsStore();
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

  it('should set profile', () => {
    spyOn(store, 'update');
    const profile: Profile = {
      age: 23,
      country: 'test',
      languages: [],
      name: 'user',
    };
    store.setProfile(profile);
    expect(store.update).toHaveBeenCalledWith({ profile });
  });
});
