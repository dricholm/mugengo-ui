import { FormGroup, ValidationErrors, FormControl } from '@angular/forms';

export function confirmValidator(key: string) {
  return (group: FormGroup): ValidationErrors | null => {
    const base: FormControl = group.get(key) as FormControl;
    const confirm: FormControl = group.get(`${key}Confirm`) as FormControl;

    if (base == null || confirm == null) {
      throw new Error(`No ${key} and ${key}Confirm FormControl found`);
    }

    return base.value === confirm.value ? null : { [`${key}Confirm`]: true };
  };
}
