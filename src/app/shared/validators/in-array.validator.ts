import { FormControl, ValidationErrors } from '@angular/forms';

export function inArrayValidator(array: Array<any>) {
  return (control: FormControl): ValidationErrors | null =>
    array.some((element: any) => element === control.value)
      ? null
      : { inArray: true };
}
