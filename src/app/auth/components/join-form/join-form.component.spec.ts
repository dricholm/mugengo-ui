import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JoinFormComponent } from './join-form.component';
import { JoinRequest } from '@app/auth/interfaces';

describe('JoinFormComponent', () => {
  let component: JoinFormComponent;
  let fixture: ComponentFixture<JoinFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JoinFormComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinFormComponent);
    component = fixture.componentInstance;
  });

  it('should emit submit', () => {
    fixture.detectChanges();

    spyOn(component.submit, 'emit').and.callThrough();
    const formData: JoinRequest = {
      email: 'user@mugengo.com',
      name: 'username',
      password: 'password',
    };
    const inputs: Array<
      HTMLInputElement
    > = fixture.nativeElement.querySelectorAll('input');
    const button: HTMLElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(inputs.length).toBe(4);
    button.click();
    expect(component.submit.emit).toHaveBeenCalledTimes(0);

    inputs[0].value = formData.name;
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = formData.email;
    inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = formData.password;
    inputs[2].dispatchEvent(new Event('input'));
    inputs[3].value = formData.password;
    inputs[3].dispatchEvent(new Event('input'));
    button.click();
    expect(component.submit.emit).toHaveBeenCalledWith(formData);
  });

  it('should not display any alerts', () => {
    fixture.detectChanges();
    const alertCheck: Array<
      HTMLElement
    > = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertCheck.length).toBe(0);
  });

  it('should display success', () => {
    component.success = true;
    fixture.detectChanges();
    const alertCheck: Array<
      HTMLElement
    > = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertCheck.length).toBe(1);
    expect(alertCheck[0].classList.contains('alert-success')).toBe(true);
  });

  it('should display error', () => {
    component.error = 500;
    fixture.detectChanges();
    const alertCheck: Array<
      HTMLElement
    > = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertCheck.length).toBe(1);
    expect(alertCheck[0].classList.contains('alert-danger')).toBe(true);
  });
});
