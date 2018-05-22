import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocationSelectorComponent } from './location-selector/location-selector.component';
import { RouterModule } from '@angular/router';
import { ShowWeatherComponent } from './show-weather/show-weather.component';
import { GetWeatherInfoService } from './get-weather-info.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes = [
  { 'path': '', component: LocationSelectorComponent },
  { 'path': 'weather/:city', component: ShowWeatherComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LocationSelectorComponent,
    ShowWeatherComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
