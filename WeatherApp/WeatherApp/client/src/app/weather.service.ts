import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import * as operators from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '5a80963efb4716c21fe155feb7f73315';
  apiUrl = 'http://api.openweathermap.org/data/2.5/';

  constructor(private http: HttpClient) { }

  getCurrentWeather(city: string) {
    return this.http.get(`${this.apiUrl}weather?q=${city}&appid=${this.apiKey}`);
  }

  getOneHourForecast(city: string) {
    // OpenWeatherMap API does not provide a 1-hour forecast. 
    // Instead, you can use the 3-hourly forecast and extract the first interval as the closest approximation.
    return this.http.get(`${this.apiUrl}forecast?q=${city}&appid=${this.apiKey}`).pipe(
      map((response: any) => {
        return response.list[0];
      })
    );
  }

  getTwoDayForecast(city: string) {
    return this.http.get(`${this.apiUrl}forecast?q=${city}&cnt=16&appid=${this.apiKey}`);
  }

  // getSevenDayForecast(city: string) {
  //   return this.http.get(`${this.apiUrl}forecast/daily?q=${city}&cnt=7&appid=${this.apiKey}`);
  // }
  getFiveDayForecast(city: string) {
    // Get 3-hourly forecast for next 5 days.
    return this.http.get(`${this.apiUrl}forecast?q=${city}&appid=${this.apiKey}`).pipe(
      map((response: any) => {
        // Filter out data to only include forecasts for the next 5 days.
        return response.list.filter((forecast: any, index: number) => index < 40);
      })
    );
  }
  
}
