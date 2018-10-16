import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

import { initFontAwesomeLibrary } from './font-awesome';
import { LanguageIconsComponent } from './components/language-icons/language-icons.component';
import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';

initFontAwesomeLibrary();

@NgModule({
  declarations: [LanguageIconsComponent, LanguageSelectorComponent],
  exports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    LanguageIconsComponent,
    LanguageSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TooltipModule,
    TypeaheadModule,
  ],
})
export class SharedModule {}
