import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProfileSettingsPageComponent } from './profile-settings-page.component';
import { SettingsService } from '@app/settings/state';
import { Profile } from '@app/settings/interfaces';

describe('ProfileSettingsPageComponent', () => {
  let component: ProfileSettingsPageComponent;
  let fixture: ComponentFixture<ProfileSettingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileSettingsPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call onSubmit on submit event', inject(
    [SettingsService],
    (service: SettingsService) => {
      spyOn(service, 'updateProfile$').and.callThrough();
      const form: HTMLElement = fixture.nativeElement.querySelector(
        'mgg-profile-settings-form'
      );
      form.dispatchEvent(new Event('submit'));
      expect(service.updateProfile$).toHaveBeenCalled();
    }
  ));

  it('should call SettingsService.updateProfile during onSubmit', inject(
    [SettingsService],
    (service: SettingsService) => {
      spyOn(service, 'updateProfile$').and.callThrough();
      const data: Profile = {
        age: 11,
        country: 'test',
        name: 'username',
      };
      component.onSubmit(data);
      expect(service.updateProfile$).toHaveBeenCalledWith(data);
    }
  ));
});
