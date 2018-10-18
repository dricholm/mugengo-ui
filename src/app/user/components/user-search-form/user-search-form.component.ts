import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';

import { Country, Language } from '@app/core/state';
import { intervalValidator, inArrayValidator } from '@app/shared/validators';
import { expandAnimation, collapseAnimation } from '@app/shared/animations';
import { SearchRequest } from '@app/user/interfaces';

@Component({
  animations: [
    trigger('height', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-user-search-form',
  templateUrl: './user-search-form.component.html',
})
export class UserSearchFormComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  error: number;
  @Input()
  countries: Array<Country> = [];
  @Input()
  languages: Array<Language> = [];
  @Output()
  submit: EventEmitter<Partial<SearchRequest>> = new EventEmitter<
    Partial<SearchRequest>
  >();

  form: FormGroup;

  submitClicked: boolean;

  ngOnInit() {
    this.form = new FormGroup({
      age: new FormGroup(
        {
          from: new FormControl(null, {
            updateOn: 'submit',
            validators: [Validators.max(999), Validators.min(0)],
          }),
          to: new FormControl(null, {
            updateOn: 'submit',
            validators: [Validators.max(999), Validators.min(0)],
          }),
        },
        { validators: [intervalValidator()], updateOn: 'submit' }
      ),
      country: new FormControl(null, {
        updateOn: 'submit',
        validators: [
          inArrayValidator(this.countries.map(country => country.name)),
        ],
      }),
      language: new FormGroup({
        languages: new FormArray([]),
        name: new FormControl(null, {
          updateOn: 'submit',
          validators: [
            inArrayValidator(this.languages.map(language => language.name)),
          ],
        }),
      }),
      name: new FormControl(),
    });
  }

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submitClicked = true;
    if (this.form.valid) {
      const selectedCountry: Country = this.countries.find(
        country => country.name === this.form.value.country
      );

      const request: SearchRequest = {
        country: selectedCountry ? selectedCountry.code : null,
        fromAge: (this.form.get('age') as FormGroup).get('from').value,
        languages: (this.form.get('language') as FormGroup).get('languages')
          .value,
        name: this.form.get('name').value,
        toAge: (this.form.get('age') as FormGroup).get('to').value,
      };
      this.submit.emit(request);
    }
  }

  get formDisabled(): 'disabled' | null {
    return this.loading ? 'disabled' : null;
  }

  get ageError(): boolean {
    return (this.form.get('age') as FormGroup).errors != null;
  }

  get fromAgeError(): boolean {
    return (
      ((this.form.get('age') as FormGroup).get('from') as FormControl).errors !=
      null
    );
  }
  get toAgeError(): boolean {
    return (
      ((this.form.get('age') as FormGroup).get('to') as FormControl).errors !=
      null
    );
  }
}
