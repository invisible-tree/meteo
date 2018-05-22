import { GetWeatherInfoService } from './../get-weather-info.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.css']
})

/**
 * City selector component
 */
export class LocationSelectorComponent implements OnInit {

  myControl: FormControl = new FormControl();

  // Cities array. API allows names of cities in english.
  cities = [
    'Madrid',
    'London',
    'Paris',
    'Berlin',
    'Roma',
    'Moscu',
    'Dublin',
    'Lisboa',
    'Reykjavík',
    'Sidney'
  ];

  filteredOptions: Observable<string[]>;

  /**
   * Constructor.
   * @param getWeatherInfo
   * @param router
   */
  constructor(
    private getWeatherInfo: GetWeatherInfoService,
    private router: Router
    ) {
  }

  /**
   * Angular Material autocomplete filter
   */
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filter(val))
      );
  }

  filter(val: string): string[] {
    return this.cities.filter(option =>
      option.toLowerCase().includes(val.toLowerCase()));
  }

  displayFn(_city): string {
    return _city ? _city : '';
  }

  /**
   * Navigate to weather page
   * @param _city
   */
  selectLocation(_city) {
    this.router.navigate(['/weather', _city]);
  }

}
