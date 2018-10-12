import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSettingsPageComponent } from './language-settings-page.component';

describe('LanguageSettingsPageComponent', () => {
  let component: LanguageSettingsPageComponent;
  let fixture: ComponentFixture<LanguageSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageSettingsPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
