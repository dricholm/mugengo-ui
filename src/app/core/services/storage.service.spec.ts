import { TestBed, inject } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
  });

  it('should get accessToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'getItem').and.returnValue('testToken');
      expect(service.accessToken).toBe('testToken');
    }
  ));

  it('should get refreshToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'getItem').and.returnValue('testToken');
      expect(service.refreshToken).toBe('testToken');
    }
  ));

  it('should set accessToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'setItem').and.callFake(() => {});
      service.accessToken = 'testToken';
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'accessToken',
        'testToken'
      );
    }
  ));

  it('should set refreshToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'setItem').and.callFake(() => {});
      service.refreshToken = 'testToken';
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        'testToken'
      );
    }
  ));

  it('should remove accessToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'removeItem').and.callFake(() => {});
      service.accessToken = null;
      expect(localStorage.removeItem).toHaveBeenCalledWith('accessToken');
    }
  ));

  it('should remove refreshToken', inject(
    [StorageService],
    (service: StorageService) => {
      spyOn(localStorage, 'removeItem').and.callFake(() => {});
      service.refreshToken = null;
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    }
  ));
});
