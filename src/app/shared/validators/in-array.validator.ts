import { FormControl, ValidationErrors } from '@angular/forms';

export function inArrayValidator(array: Array<any>) {
  return (control: FormControl): ValidationErrors | null => {
    if (control.value == null || control.value === '') {
      return null;
    }

    return array.some((element: any) => element === control.value)
      ? null
      : { inArray: true };
  };
}
