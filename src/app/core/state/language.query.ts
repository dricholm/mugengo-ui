import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { LanguageStore, LanguageState } from './language.store';
import { Language } from './language.model';

@Injectable({ providedIn: 'root' })
export class LanguageQuery extends QueryEntity<LanguageState, Language> {
  constructor(protected store: LanguageStore) {
    super(store);
  }
}
