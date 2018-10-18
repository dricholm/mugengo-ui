import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { UserSearchPageComponent } from './user-search-page.component';
import { UserService } from '@app/user/state';
import { SearchRequest } from '@app/user/interfaces';

describe('UserSearchPageComponent', () => {
  let component: UserSearchPageComponent;
  let fixture: ComponentFixture<UserSearchPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserSearchPageComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserSearchPageComponent);
    component = fixture.componentInstance;
  }));

  it('should call userService.search onSubmit', inject(
    [UserService],
    (userService: UserService) => {
      fixture.detectChanges();
      spyOn(userService, 'search$').and.returnValue(of(null));
      const request: Partial<SearchRequest> = {
        name: 'Testing service',
      };
      component.onSubmit(request);
      expect(userService.search$).toHaveBeenCalledWith(request);
    }
  ));
});
