import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SignInFormComponent } from './sign-in-form.component';
import { SignInForm } from '@app/auth/interfaces';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignInFormComponent],
      imports: [NoopAnimationsModule, ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
  });

  it('should emit submit', () => {
    fixture.detectChanges();

    spyOn(component.submit, 'emit').and.callThrough();
    const formData: SignInForm = {
      email: 'user@mugengo.com',
      password: 'password',
    };
    const inputs: Array<
      HTMLInputElement
    > = fixture.nativeElement.querySelectorAll('input');
    const button: HTMLElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(inputs.length).toBe(2);
    button.click();
    expect(component.submit.emit).toHaveBeenCalledTimes(0);

    inputs[0].value = formData.email;
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = formData.password;
    inputs[1].dispatchEvent(new Event('input'));
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

  it('should display error', () => {
    component.error = 400;
    fixture.detectChanges();
    const alertCheck: Array<
      HTMLElement
    > = fixture.nativeElement.querySelectorAll('.alert');
    expect(alertCheck.length).toBe(1);
    expect(alertCheck[0].classList.contains('alert-danger')).toBe(true);
  });
});
