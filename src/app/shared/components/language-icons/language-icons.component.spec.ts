import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { LanguageIconsComponent } from './language-icons.component';
import { LanguageQuery } from '@app/core/state';

describe('LanguageIconComponent', () => {
  let component: LanguageIconsComponent;
  let fixture: ComponentFixture<LanguageIconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageIconsComponent],
      imports: [TooltipModule.forRoot()],
    }).compileComponents();
    fixture = TestBed.createComponent(LanguageIconsComponent);
    component = fixture.componentInstance;
  }));

  it('should set name', inject(
    [LanguageQuery],
    (languageQuery: LanguageQuery) => {
      spyOn(languageQuery, 'getEntity').and.returnValue({
        code: 'lg',
        name: 'Test Language',
      });
      component.languages = [{ code: 'lg', level: 1 }];
      fixture.detectChanges();

      const spans: Array<HTMLElement> = fixture.nativeElement.querySelectorAll(
        'span'
      );
      expect(spans.length).toBe(1);
      expect(spans[0].textContent).toContain('lg 1');
      expect(languageQuery.getEntity).toHaveBeenCalledWith('lg');
      expect(spans[0].getAttribute('ng-reflect-tooltip')).toBe('Test Language');
    }
  ));
});
