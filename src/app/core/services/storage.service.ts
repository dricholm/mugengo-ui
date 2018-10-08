import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get accessToken(): string {
    return localStorage.getItem('accessToken');
  }

  set accessToken(token: string) {
    if (token == null) {
      localStorage.removeItem('accessToken');
      return;
    }
    localStorage.setItem('accessToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken');
  }

  set refreshToken(token: string) {
    if (token == null) {
      localStorage.removeItem('refreshToken');
      return;
    }
    localStorage.setItem('refreshToken', token);
  }
}
