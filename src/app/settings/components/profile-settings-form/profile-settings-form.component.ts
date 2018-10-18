import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';

import { expandAnimation, collapseAnimation } from '@app/shared/animations';
import { Profile } from '@app/settings/interfaces';
import { Country, Language } from '@app/core/state';
import { inArrayValidator } from '@app/shared/validators';

@Component({
  animations: [
    trigger('height', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-profile-settings-form',
  styleUrls: ['./profile-settings-form.component.scss'],
  templateUrl: './profile-settings-form.component.html',
})
export class ProfileSettingsFormComponent implements OnInit, OnChanges {
  @Input()
  error: number;
  @Input()
  success: boolean;
  @Input()
  loading: boolean;
  @Input()
  countries: Array<Country> = [];
  @Input()
  languages: Array<Language> = [];
  @Input()
  profile: Profile;
  @Output()
  submit: EventEmitter<Profile> = new EventEmitter<Profile>();

  profileForm: FormGroup;

  submitClicked: boolean;

  ngOnInit() {
    this.profileForm = new FormGroup({
      age: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.max(999), Validators.min(1)],
      }),
      country: new FormControl(null, {
        updateOn: 'submit',
        validators: [
          inArrayValidator(this.countries.map(country => country.name)),
        ],
      }),
      language: new FormGroup({
        languages: new FormArray([]),
        name: new FormControl(),
      }),
      name: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required],
      }),
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile && changes.profile.currentValue) {
      this.profileForm.get('age').setValue(changes.profile.currentValue.age);

      const selectedCountry: Country = this.countries.find(
        country => country.code === changes.profile.currentValue.country
      );
      if (selectedCountry != null) {
        this.profileForm.get('country').setValue(selectedCountry.name);
      }

      this.profileForm.get('name').setValue(changes.profile.currentValue.name);

      this.languagesFormArray.controls = [];
      changes.profile.currentValue.languages.forEach(
        (language: { id: number; code: string; level: number }) => {
          this.languagesFormArray.push(
            new FormGroup({
              code: new FormControl(language.code, [Validators.required]),
              level: new FormControl(language.level, [Validators.required]),
            })
          );
        }
      );
    }
  }

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submitClicked = true;
    if (this.profileForm.valid) {
      const selectedCountry: Country = this.countries.find(
        country => country.name === this.profileForm.value.country
      );
      this.submit.emit({
        age: this.profileForm.value.age,
        country: selectedCountry ? selectedCountry.code : null,
        languages: this.languagesFormArray.value,
        name: this.profileForm.value.name,
      });
    }
  }

  get languagesFormArray(): FormArray {
    return this.profileForm.get('language').get('languages') as FormArray;
  }

  get formDisabled(): 'disabled' | null {
    return this.loading || (this.profile == null && this.error != null)
      ? 'disabled'
      : null;
  }
}
