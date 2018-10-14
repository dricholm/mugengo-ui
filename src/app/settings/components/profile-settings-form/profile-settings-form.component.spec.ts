import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, SimpleChange } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
    component.languages = [{ code: 'lc', name: 'Language test' }];
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
    inputs[3].value = 'Language test';
    inputs[3].dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button[type="button"]').click();
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

  it('should not add language if incorrect', () => {
    component.languages = [{ code: 'lc', name: 'Language test' }];
    component.profile = { age: null, country: '', languages: [], name: 'User' };
    fixture.detectChanges();
    component.ngOnChanges({
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#language'
    );
    const addButton: HTMLElement = fixture.nativeElement.querySelector(
      'button#addLanguage'
    );

    input.value = 'lang';
    input.dispatchEvent(new Event('input'));
    addButton.click();
    expect(component.languageError).toBe('notFound');
  });

  it('should not add language if already exists', () => {
    component.languages = [
      { code: 'lc', name: 'Language test' },
      { code: 'ab', name: 'Added' },
    ];
    component.profile = {
      age: null,
      country: '',
      languages: [{ code: 'ab', level: 2 }],
      name: 'User',
    };
    fixture.detectChanges();
    component.ngOnChanges({
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#language'
    );
    const addButton: HTMLElement = fixture.nativeElement.querySelector(
      'button#addLanguage'
    );

    input.value = 'Added';
    input.dispatchEvent(new Event('input'));
    addButton.click();
    expect(component.languageError).toBe('exists');
  });

  it('should remove language', () => {
    component.languages = [
      { code: 'lc', name: 'Language test' },
      { code: 'ab', name: 'Added' },
    ];
    component.profile = {
      age: null,
      country: '',
      languages: [{ code: 'ab', level: 2 }],
      name: 'User',
    };
    component.ngOnChanges({
      languages: new SimpleChange(null, component.languages, true),
      profile: new SimpleChange(null, component.profile, true),
    });
    fixture.detectChanges();

    const removeButton: HTMLInputElement = fixture.nativeElement.querySelector(
      'button'
    );

    removeButton.click();
    expect(component.languagesForm.length).toBe(0);
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
