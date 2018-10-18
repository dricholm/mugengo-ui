import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { LanguageSelectorComponent } from './language-selector.component';

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelectorComponent;
  let fixture: ComponentFixture<LanguageSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSelectorComponent],
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        TypeaheadModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(LanguageSelectorComponent);
    component = fixture.componentInstance;
  }));

  it('should display input values', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
        }),
        new FormGroup({
          code: new FormControl('cd'),
          level: new FormControl(3),
        }),
      ]),
      name: new FormControl(),
    });
    fixture.detectChanges();

    const forms: Array<HTMLElement> = fixture.nativeElement.querySelectorAll(
      '.language-form'
    );
    expect(forms.length).toBe(2);
    expect(fixture.nativeElement.querySelector('.search-grid')).toBeNull();
  });

  it('should add language', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
        }),
      ]),
      name: new FormControl(),
    });
    component.languages = [
      { code: 'ab', name: 'Lang' },
      { code: 'cd', name: 'Second' },
    ];
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#languageName'
    );

    input.value = 'Second';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button#addLanguage').click();

    expect(component.array.length).toBe(2);
    expect(component.array.at(1).get('code').value).toBe('cd');
    expect(component.array.at(1).get('level').value).toBe(1);
    expect(component.array.at(1).get('search')).toBeNull();
  });

  it('should remove language', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
        }),
      ]),
      name: new FormControl(),
    });
    component.languages = [{ code: 'ab', name: 'Lang' }];
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();
    expect(component.array.length).toBe(0);
  });

  it('should display search inputs', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
          relation: new FormControl(1),
        }),
      ]),
      name: new FormControl(),
    });
    component.search = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.grid-search')).toBeTruthy();
  });

  it('should add language (search)', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
          relation: new FormControl(1),
        }),
      ]),
      name: new FormControl(),
    });
    component.languages = [
      { code: 'ab', name: 'Lang' },
      { code: 'cd', name: 'Second' },
    ];
    component.search = true;
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#languageName'
    );

    input.value = 'Second';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button#addLanguage').click();

    expect(component.array.length).toBe(2);
    expect(component.array.at(1).get('code').value).toBe('cd');
    expect(component.array.at(1).get('level').value).toBe(1);
    expect(component.array.at(1).get('relation').value).toBe(1);
  });

  it('should set exists error', () => {
    component.form = new FormGroup({
      languages: new FormArray([
        new FormGroup({
          code: new FormControl('ab'),
          level: new FormControl(2),
        }),
      ]),
      name: new FormControl(),
    });
    component.languages = [{ code: 'ab', name: 'Lang' }];
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#languageName'
    );

    input.value = 'Lang';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button#addLanguage').click();

    expect(component.form.get('name').getError('exists')).toBe(true);
  });

  it('should set not found error', () => {
    component.languages = [{ code: 'lc', name: 'Language test' }];
    fixture.detectChanges();

    const input: HTMLInputElement = fixture.nativeElement.querySelector(
      'input#languageName'
    );

    input.value = 'lang';
    input.dispatchEvent(new Event('input'));
    fixture.nativeElement.querySelector('button#addLanguage').click();

    expect(component.form.get('name').getError('notFound')).toBe(true);
  });
});
