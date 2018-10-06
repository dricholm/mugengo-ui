import { FormGroup, ValidationErrors } from '@angular/forms';

export function confirmValidator(key: string) {
  return (group: FormGroup): ValidationErrors | null =>
    group.controls[key].value === group.controls[`${key}Confirm`].value
      ? null
      : { [`${key}Confirm`]: true };
}
