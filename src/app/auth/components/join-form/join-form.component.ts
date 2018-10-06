import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { confirmValidator } from '@app/shared/validators';
import { JoinForm } from '@app/auth/interfaces';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-join-form',
  templateUrl: './join-form.component.html',
})
export class JoinFormComponent {
  @Input()
  error: number;
  // TODO: Add loading spinner
  @Input()
  loading: boolean;
  @Input()
  success: boolean;
  @Output()
  submit: EventEmitter<JoinForm> = new EventEmitter<JoinForm>();

  joinForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required, Validators.email],
      }),
      name: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required, Validators.minLength(6)],
      }),
      passwordConfirm: new FormControl(null, {
        updateOn: 'submit',
        validators: [Validators.required, Validators.minLength(6)],
      }),
    },
    { updateOn: 'submit', validators: [confirmValidator('password')] }
  );

  submitClicked: boolean;

  onSubmit(event: Event) {
    event.stopPropagation();
    this.submitClicked = true;
    if (this.joinForm.valid) {
      this.submit.emit({
        email: this.joinForm.value.email,
        name: this.joinForm.value.name,
        password: this.joinForm.value.password,
      });
    }
  }
}
