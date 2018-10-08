import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SignOutComponent } from './sign-out.component';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/state';

describe('SignOutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignOutComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  }));

  it('should call signOut and redirect', inject(
    [AuthService, Router],
    (authService: AuthService, router: Router) => {
      spyOn(authService, 'signOut');
      spyOn(router, 'navigateByUrl');
      const fixture: ComponentFixture<
        SignOutComponent
      > = TestBed.createComponent(SignOutComponent);
      const component: SignOutComponent = fixture.componentInstance;
      fixture.detectChanges();
      expect(authService.signOut).toHaveBeenCalledTimes(1);
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    }
  ));
});
