import { GetWeatherInfoService } from './../get-weather-info.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css']
})

/**
 * Get API info and display weather.
 */
export class ShowWeatherComponent implements OnInit {
  public selectedCity;
  currentWeather;
  forecastWeather;

  /**
   * Constructor. Get city name from routing.
   * @param route
   * @param getWeatherInfo
   */
  constructor(
    private route: ActivatedRoute,
    private getWeatherInfo: GetWeatherInfoService
  ) {
    this.route.params
      .subscribe( x => {
        this.getInfo(x.city);
      });
  }

  ngOnInit() {
  }

  /**
   * Get Info from API.
   * Returns selectedCity (string), currentWeather (obj) and forecastWeather (obj)
   * @param _city
   */
  getInfo(_city) {
    this.getWeatherInfo.apiCall(_city)
      .subscribe( x => {
        // console.log('apiCall: ', x);
        this.selectedCity = x.location.name;
        this.currentWeather = this.current(x);
        this.forecastWeather = this.forecast(x.forecast.forecastday);
      });
  }

  /**
   * Object with current weather info
   * @param _data
   */
  current(_data) {
    const resultObj = {
        'date': this.formatDate(_data.current.last_updated),
        'temp': _data.current.temp_c,
        'precip': _data.current.precip_mm + ' mm',
        'maxtemp': _data.forecast.forecastday[0].day.maxtemp_c,
        'mintemp': _data.forecast.forecastday[0].day.mintemp_c,
        'totalprecip': _data.forecast.forecastday[0].day.totalprecip_mm + ' mm'
    };
    return resultObj;
  }

  /**
   * Object with forecast info (next days)
   * @param _data
   */
  forecast(_data) {
    const resultObj = [];
    for (let i = 0; i < _data.length; i++) {
      resultObj[i] = {
        'date': this.formatDate(_data[i].date),
        'maxtemp': _data[i].day.maxtemp_c,
        'mintemp': _data[i].day.mintemp_c,
        'totalprecip': _data[i].day.totalprecip_mm
      };
    }
    return resultObj;
  }

  /**
   * Object with separated date details: name, day, month, year
   * @param _date
   */
  formatDate(_date) {
    const momento = moment;
    const dateMoment = momento(_date).locale('es');
    const resultObj = {
      'dateName': dateMoment.format('dddd'),
      'day': dateMoment.format('DD'),
      'month': dateMoment.format('MM'),
      'year': dateMoment.format('YY'),
    };
    return resultObj;
  }

}
