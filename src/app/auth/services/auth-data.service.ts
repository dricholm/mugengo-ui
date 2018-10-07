import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JoinRequest, TokenRequest, TokenResponse } from '@app/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private http: HttpClient) {}

  join$(data: JoinRequest): Observable<Object> {
    return this.http.post('auth/register', data);
  }

  token$(data: TokenRequest): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('auth/token', data);
  }
}
