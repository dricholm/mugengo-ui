import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';

import { expandAnimation, collapseAnimation } from '@app/shared/animations';
import { Country } from '@app/core/interfaces';
import { Profile } from '@app/settings/interfaces';

@Component({
  animations: [
    trigger('height', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-profile-settings-form',
  templateUrl: './profile-settings-form.component.html',
})
export class ProfileSettingsFormComponent implements OnChanges {
  @Input()
  error: number;
  @Input()
  success: boolean;
  @Input()
  loading: boolean;
  @Input()
  countries: Array<Country>;
  @Input()
  profile: Profile;
  @Output()
  submit: EventEmitter<Profile> = new EventEmitter<Profile>();

  profileForm: FormGroup = new FormGroup({
    age: new FormControl(null, {
      updateOn: 'submit',
      validators: [Validators.max(999), Validators.min(1)],
    }),
    country: new FormControl(null, {
      updateOn: 'submit',
      validators: [],
    }),
    name: new FormControl(null, {
      updateOn: 'submit',
      validators: [Validators.required],
    }),
  });

  submitClicked: boolean;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.profile && changes.profile.currentValue) {
      this.profileForm.controls.age.setValue(changes.profile.currentValue.age);
      this.profileForm.controls.country.setValue(
        changes.profile.currentValue.country
      );
      this.profileForm.controls.name.setValue(
        changes.profile.currentValue.name
      );
    }
  }

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submitClicked = true;
    if (this.profileForm.valid) {
      this.submit.emit(this.profileForm.value);
    }
  }

  get formDisabled(): 'disabled' | null {
    return this.loading || (this.profile == null && this.error != null)
      ? 'disabled'
      : null;
  }
}
