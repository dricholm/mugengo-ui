import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { initFontAwesomeLibrary } from './font-awesome';
import { LanguageIconsComponent } from './components/language-icons/language-icons.component';

initFontAwesomeLibrary();

@NgModule({
  declarations: [LanguageIconsComponent],
  exports: [ReactiveFormsModule, FontAwesomeModule, LanguageIconsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TooltipModule,
  ],
})
export class SharedModule {}
