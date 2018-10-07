import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { SignInPageComponent } from './sign-in-page.component';
import { AuthService } from '@app/auth/state';
import { SignInForm } from '@app/auth/interfaces';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onSubmit on submit event', inject(
    [AuthService],
    (authService: AuthService) => {
      spyOn(authService, 'token$').and.callThrough();
      const signInForm: HTMLElement = fixture.nativeElement.querySelector(
        'mgg-sign-in-form'
      );
      signInForm.dispatchEvent(new Event('submit'));
      expect(authService.token$).toHaveBeenCalled();
    }
  ));

  it('should call AuthService.signIn during onSubmit', inject(
    [AuthService, Router],
    (authService: AuthService, router: Router) => {
      spyOn(authService, 'token$').and.returnValue(of(null));
      spyOn(router, 'navigateByUrl').and.callThrough();
      const signInData: SignInForm = {
        email: 'user@mugengo.com',
        password: 'password',
      };
      component.onSubmit(signInData);
      expect(authService.token$).toHaveBeenCalledWith({
        ...signInData,
        grant_type: 'password',
      });
      // Causes console.warn, see: https://github.com/angular/angular/issues/25837
      expect(router.navigateByUrl).toHaveBeenCalledWith('/');
    }
  ));
});
