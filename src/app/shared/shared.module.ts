import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { initFontAwesomeLibrary } from './font-awesome';

initFontAwesomeLibrary();

@NgModule({
  exports: [ReactiveFormsModule, FontAwesomeModule],
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class SharedModule {}
