import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JoinPageComponent } from './join-page.component';
import { AuthService } from '@app/auth/state';
import { JoinRequest } from '@app/auth/interfaces';

describe('JoinPageComponent', () => {
  let component: JoinPageComponent;
  let fixture: ComponentFixture<JoinPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinPageComponent],
      imports: [HttpClientTestingModule],
      providers: [AuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onSubmit on submit event', inject(
    [AuthService],
    (authService: AuthService) => {
      spyOn(authService, 'join$').and.callThrough();
      const joinForm: HTMLElement = fixture.nativeElement.querySelector(
        'mgg-join-form'
      );
      joinForm.dispatchEvent(new Event('submit'));
      expect(authService.join$).toHaveBeenCalled();
    }
  ));

  it('should call AuthService.join during onSubmit', inject(
    [AuthService],
    (authService: AuthService) => {
      spyOn(authService, 'join$').and.callThrough();
      const joinData: JoinRequest = {
        email: 'user@mugengo.com',
        name: 'username',
        password: 'password',
      };
      component.onSubmit(joinData);
      expect(authService.join$).toHaveBeenCalledWith(joinData);
    }
  ));
});
