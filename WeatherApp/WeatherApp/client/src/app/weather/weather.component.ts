import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  city: string;
  forecastType: string;
  weatherData: any;

  constructor(private weatherService: WeatherService) {
    this.city = 'London'; // default city
    this.forecastType = 'current'; // default forecast type
  }

  ngOnInit(): void {
    this.getWeatherData();
  }

  getWeatherData(): void {
    switch (this.forecastType) {
      case 'current':
        this.weatherService.getCurrentWeather(this.city)
          .subscribe(data => this.weatherData = data);
        break;
      case '1hour':
        this.weatherService.getOneHourForecast(this.city)
          .subscribe(data => this.weatherData = data);
        break;
      case '2day':
        this.weatherService.getTwoDayForecast(this.city)
          .subscribe(data => this.weatherData = data);
        break;
      case '7day':
        this.weatherService.getFiveDayForecast(this.city)
          .subscribe(data => this.weatherData = data);
        break;
    }
  }
  
  changeCity(newCity: string): void {
    this.city = newCity;
    this.getWeatherData();
  }

  changeForecast(newForecast: string): void {
    this.forecastType = newForecast;
    this.getWeatherData();
  }
}
