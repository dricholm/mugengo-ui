import {
  TestBed,
  async,
  ComponentFixture,
  inject,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { AuthService } from '@app/auth/state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should init AuthStore', async(
    inject([AuthService], (authService: AuthService) => {
      spyOn(authService, 'init');
      fixture.detectChanges();
      expect(authService.init).toHaveBeenCalledTimes(1);
    })
  ));

  it('should display nav if logged in', async(() => {
    component.loggedIn$ = of(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')).toBeTruthy();
  }));

  it('should not display nav if not logged in', async(() => {
    component.loggedIn$ = of(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('nav')).toBeNull();
  }));
});
