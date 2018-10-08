import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthQuery, AuthService } from '@app/auth/state';

@Component({
  selector: 'mgg-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private authQuery: AuthQuery, private authService: AuthService) {}

  loggedIn$: Observable<boolean> = this.authQuery.loggedIn$;

  ngOnInit() {
    this.authService.init();
  }
}
