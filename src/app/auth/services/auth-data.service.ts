import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JoinForm } from '@app/auth/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthDataService {
  constructor(private http: HttpClient) {}

  join(data: JoinForm): Observable<Object> {
    return this.http.post('auth/register', data);
  }
}
