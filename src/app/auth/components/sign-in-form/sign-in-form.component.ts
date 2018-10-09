import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, useAnimation } from '@angular/animations';

import { SignInForm } from '@app/auth/interfaces/sign-in-form.interface';
import { fadeInAnimation, fadeOutAnimation } from '@app/shared/animations';

@Component({
  animations: [
    trigger('fade', [
      transition(':enter', [useAnimation(fadeInAnimation)]),
      transition(':leave', [useAnimation(fadeOutAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-sign-in-form',
  templateUrl: './sign-in-form.component.html',
})
export class SignInFormComponent {
  @Input()
  error: number;
  // TODO: Add loading spinner
  @Input()
  loading: boolean;
  @Output()
  submit: EventEmitter<SignInForm> = new EventEmitter<SignInForm>();

  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, {
      updateOn: 'submit',
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl(null, {
      updateOn: 'submit',
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  submitClicked: boolean;

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submitClicked = true;
    if (this.signInForm.valid) {
      this.submit.emit(this.signInForm.value);
    }
  }
}
