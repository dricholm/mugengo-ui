import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Language } from '@app/core/state';
import { trigger, transition, useAnimation } from '@angular/animations';

import { expandAnimation, collapseAnimation } from '@app/shared/animations';

@Component({
  animations: [
    trigger('height', [
      transition(':enter', [useAnimation(expandAnimation)]),
      transition(':leave', [useAnimation(collapseAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-language-selector',
  styleUrls: ['./language-selector.component.scss'],
  templateUrl: './language-selector.component.html',
})
export class LanguageSelectorComponent {
  @Input()
  languages: Array<Language> = [];
  @Input()
  form: FormGroup = new FormGroup({
    languages: new FormArray([]),
    name: new FormControl(),
  });
  @Input()
  search: boolean;
  @Input()
  formDisabled: boolean;

  onAdd() {
    const selectedLanguage: Language = this.languages.find(
      language => language.name === this.form.get('name').value
    );

    if (this.handleErrors(selectedLanguage)) {
      return;
    }

    if (this.search) {
      this.array.push(
        new FormGroup({
          code: new FormControl(selectedLanguage.code, [Validators.required]),
          level: new FormControl(1, [Validators.required]),
          relation: new FormControl(1, [Validators.required]),
        })
      );
    } else {
      this.array.push(
        new FormGroup({
          code: new FormControl(selectedLanguage.code, [Validators.required]),
          level: new FormControl(1, [Validators.required]),
        })
      );
    }
    this.form.get('name').setValue(null);
  }

  onRemove(index: number) {
    this.array.removeAt(index);
  }

  getId(type: string, index: number, level: number): string {
    return `language-${type}-${index}-${level}`;
  }

  get array(): FormArray {
    return this.form.get('languages') as FormArray;
  }

  private handleErrors(selectedLanguage: Language): boolean {
    if (selectedLanguage == null) {
      this.form.get('name').setErrors({ notFound: true });
      return true;
    }

    if (
      this.array.controls.some(
        (control: FormControl) => control.value.code === selectedLanguage.code
      )
    ) {
      this.form.get('name').setErrors({ exists: true });
      return true;
    }

    this.form.get('name').setErrors(null);
    return false;
  }
}
