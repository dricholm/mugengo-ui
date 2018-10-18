import { FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export function intervalValidator() {
  return (group: FormGroup): ValidationErrors | null => {
    const from: FormControl = group.get('from') as FormControl;
    const to: FormControl = group.get('to') as FormControl;

    if (from == null || to == null) {
      throw new Error('Validator needs a from and to FormControl');
    }

    if (from.value == null || to.value == null) {
      return null;
    }

    if (from.value <= to.value) {
      return null;
    }

    return { interval: true };
  };
}
