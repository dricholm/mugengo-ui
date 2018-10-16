import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
import { LanguageQuery, Language } from '@app/core/state';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'mgg-language-icons',
  styleUrls: ['./language-icons.component.scss'],
  templateUrl: './language-icons.component.html',
})
export class LanguageIconsComponent {
  @Input()
  languages: Array<{ code: string; level: number }>;

  @HostBinding()
  class = 'd-flex align-items-center';

  constructor(private languageQuery: LanguageQuery) {}

  getName(index: number): string {
    const language: Language = this.languageQuery.getEntity(
      this.languages[index].code
    );
    return language ? language.name : '';
  }
}
