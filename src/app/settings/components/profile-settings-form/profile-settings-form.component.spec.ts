import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { ProfileSettingsFormComponent } from './profile-settings-form.component';
import { Profile } from '@app/settings/interfaces';

describe('ProfileSettingsFormComponent', () => {
  let component: ProfileSettingsFormComponent;
  let fixture: ComponentFixture<ProfileSettingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSettingsFormComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        TypeaheadModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsFormComponent);
    component = fixture.componentInstance;
  });

  it('should emit submit', () => {
    component.countries = [{ code: 'ts', name: 'Test' }];
    component.profile = { age: null, country: '', languages: [], name: 'User' };
    fixture.detectChanges();
    component.ngOnChanges({
      countries: new SimpleChange(null, component.countries, true),
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });

    spyOn(component.submit, 'emit').and.callThrough();
    const formData: Profile = {
      age: 21,
      country: 'ts',
      languages: [{ code: 'lc', level: 1 }],
      name: 'username',
    };
    const inputs: Array<
      HTMLInputElement
    > = fixture.nativeElement.querySelectorAll('input');
    const submitButton: HTMLElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );

    inputs[0].value = formData.name;
    inputs[0].dispatchEvent(new Event('input'));
    inputs[1].value = formData.age.toString();
    inputs[1].dispatchEvent(new Event('input'));
    inputs[2].value = 'Test';
    inputs[2].dispatchEvent(new Event('input'));
    component.languagesFormArray.push(
      new FormGroup({
        code: new FormControl('lc'),
        level: new FormControl(1),
      })
    );
    submitButton.click();
    expect(component.submit.emit).toHaveBeenCalledWith(formData);
  });

  it('should set country input', () => {
    component.countries = [{ code: 'ct', name: 'Country' }];
    component.profile = {
      age: null,
      country: 'ct',
      languages: [],
      name: 'User',
    };
    fixture.detectChanges();
    component.ngOnChanges({
      countries: new SimpleChange(null, component.countries, true),
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });

    expect(component.profileForm.get('country').value).toBe('Country');
  });

  it('should set languages', () => {
    component.countries = [{ code: 'ct', name: 'Country' }];
    component.languages = [{ code: 'lg', name: 'Lang' }];
    component.profile = {
      age: null,
      country: 'ct',
      languages: [{ code: 'lg', level: 2 }],
      name: 'User',
    };
    fixture.detectChanges();
    component.ngOnChanges({
      countries: new SimpleChange(null, component.countries, true),
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });

    expect(component.profileForm.get('country').value).toBe('Country');
    expect(component.languagesFormArray.length).toBe(1);
    expect(component.languagesFormArray.at(0).get('code').value).toBe('lg');
    expect(component.languagesFormArray.at(0).get('level').value).toBe(2);
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
