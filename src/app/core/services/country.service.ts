import { Injectable } from '@angular/core';

import { Country } from '@app/core/interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private array: Array<Country> = [];

  get countries(): Array<Country> {
    return this.array;
  }
}
