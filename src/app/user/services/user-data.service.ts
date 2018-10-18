import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SearchRequest } from '../interfaces';
import { User } from '../state';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  search$(data: Partial<SearchRequest>): Observable<Array<User>> {
    return this.http.post<Array<User>>('user/search', data);
  }
}
