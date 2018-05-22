import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherInfoService {

  data = {
    url: 'http://api.apixu.com/v1/forecast.json?',
    apikey: '4913ba174f374720be5220341181905',
    lang: 'es',
    days: '5'
  };

  constructor( public network: HttpClient ) { }

  apiCall(_city) {
    return this.network
      .get<any>( this.data.url + 'key=' + this.data.apikey + '&q=' + _city + '&lang=' + this.data.lang + '&days=' + this.data.days );
      // .pipe(map( x => x = x.forecast.forecastday)) ;
  }
}
