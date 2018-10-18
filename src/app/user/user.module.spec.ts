import { UserModule } from './user.module';

describe('UserModule', () => {
  let usersModule: UserModule;

  beforeEach(() => {
    usersModule = new UserModule();
  });

  it('should create an instance', () => {
    expect(usersModule).toBeTruthy();
  });
});
