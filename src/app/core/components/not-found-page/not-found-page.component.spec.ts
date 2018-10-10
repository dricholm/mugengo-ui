import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundPageComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back on button click', inject(
    [Location],
    (location: Location) => {
      spyOn(location, 'back');
      fixture.nativeElement.querySelector('button').click();
      expect(location.back).toHaveBeenCalledTimes(1);
    }
  ));
});
