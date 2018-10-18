import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UserCardsComponent } from './user-cards.component';
import { User } from '@app/user/state';

describe('UserCardsComponent', () => {
  let component: UserCardsComponent;
  let fixture: ComponentFixture<UserCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserCardsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCardsComponent);
    component = fixture.componentInstance;
  }));

  it('should display user info', () => {
    const user: User = {
      age: 23,
      country: 'US',
      id: 1,
      languages: [{ code: 'en', level: 4 }],
      name: 'User one',
    };
    component.users = [user];
    fixture.detectChanges();

    const spans: Array<HTMLElement> = fixture.nativeElement.querySelectorAll(
      'span'
    );

    expect(
      fixture.nativeElement.querySelector('.card-title').textContent
    ).toContain(user.name);
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toContain(user.age.toString());
    expect(spans[1].textContent).toContain(user.country);
    expect(
      fixture.nativeElement.querySelector('mgg-language-icons')
    ).toBeTruthy();
  });

  it('should display multiple users', () => {
    const user: User = {
      age: 23,
      country: 'US',
      id: 1,
      languages: [{ code: 'en', level: 4 }],
      name: 'User one',
    };
    const user2: User = {
      age: 31,
      country: 'DE',
      id: 2,
      languages: [{ code: 'de', level: 4 }],
      name: 'User two',
    };
    component.users = [user, user2];
    fixture.detectChanges();

    const cards: Array<HTMLElement> = fixture.nativeElement.querySelectorAll(
      '.card'
    );

    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('.card-title').textContent).toContain(
      user.name
    );
    const spans: Array<HTMLElement> = fixture.nativeElement.querySelectorAll(
      'span'
    );
    expect(spans.length).toBe(4);
    expect(spans[0].textContent).toContain(user.age.toString());
    expect(spans[1].textContent).toContain(user.country);
    expect(cards[0].querySelector('mgg-language-icons')).toBeTruthy();

    expect(cards[1].querySelector('.card-title').textContent).toContain(
      user2.name
    );
    expect(spans[2].textContent).toContain(user2.age.toString());
    expect(spans[3].textContent).toContain(user2.country);
    expect(cards[1].querySelector('mgg-language-icons')).toBeTruthy();
  });
});
