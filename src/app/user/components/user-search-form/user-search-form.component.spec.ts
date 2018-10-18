import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { UserSearchFormComponent } from './user-search-form.component';

describe('UserSearchFormComponent', () => {
  let component: UserSearchFormComponent;
  let fixture: ComponentFixture<UserSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchFormComponent],
      imports: [ReactiveFormsModule, TypeaheadModule.forRoot()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserSearchFormComponent);
    component = fixture.componentInstance;
  }));

  it('should submit', () => {
    const spy = spyOn(component.submit, 'emit').and.callFake(() => {});
    component.countries = [{ code: 'HU', name: 'Hungary' }];
    fixture.detectChanges();

    const name: HTMLInputElement = fixture.nativeElement.querySelector('#name');
    const fromAge: HTMLInputElement = fixture.nativeElement.querySelector(
      '#fromAge'
    );
    const toAge: HTMLInputElement = fixture.nativeElement.querySelector(
      '#toAge'
    );
    const country: HTMLInputElement = fixture.nativeElement.querySelector(
      '#country'
    );
    const submitButton: HTMLButtonElement = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    name.value = 'Testing name';
    name.dispatchEvent(new Event('input'));
    fromAge.value = '22';
    fromAge.dispatchEvent(new Event('input'));
    toAge.value = '33';
    toAge.dispatchEvent(new Event('input'));
    country.value = 'Hungary';
    country.dispatchEvent(new Event('input'));
    submitButton.click();

    expect(component.submit.emit).toHaveBeenCalledTimes(1);
    expect(spy.calls.argsFor(0)).toEqual([
      {
        country: 'HU',
        fromAge: 22,
        languages: [],
        name: 'Testing name',
        toAge: 33,
      },
    ]);
  });
});
