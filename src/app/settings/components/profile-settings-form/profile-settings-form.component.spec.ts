import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ProfileSettingsFormComponent } from './profile-settings-form.component';
import { Profile } from '@app/settings/interfaces';

describe('ProfileSettingsFormComponent', () => {
  let component: ProfileSettingsFormComponent;
  let fixture: ComponentFixture<ProfileSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSettingsFormComponent],
      imports: [ReactiveFormsModule, NoopAnimationsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsFormComponent);
    component = fixture.componentInstance;
  });

  it('should emit submit', () => {
    component.countries = [{ code: 'test', name: 'Test' }];
    fixture.detectChanges();

    spyOn(component.submit, 'emit').and.callThrough();
    const formData: Profile = {
      age: 21,
      country: 'test',
      name: 'username',
    };
    const inputs: Array<
      HTMLInputElement
    > = fixture.nativeElement.querySelectorAll('input');
    const select: HTMLSelectElement = fixture.nativeElement.querySelector(
      'select'
    );
    const button: HTMLElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    expect(inputs.length).toBe(2);
    button.click();
    expect(component.submit.emit).toHaveBeenCalledTimes(0);

    inputs[0].value = formData.name;
    inputs[0].dispatchEvent(new Event('input'));
    select.value = formData.country;
    select.dispatchEvent(new Event('change'));
    inputs[1].value = formData.age.toString();
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
