import { Component, OnInit } from '@angular/core';
import { ApiControllerService } from 'src/app/common/api-controller.service';
import { Weather } from 'src/assets/data/api-classes/weather';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {
  public weather: Weather = { temp: -999, city: "", type: "", icon: "http://openweathermap.org/img/wn/" };
  public loadedWeather: boolean = false;
  public errorWeather: boolean = false;

  constructor(
    private _apiService: ApiControllerService
  ) { }

  ngOnInit(): void {
    this.getLocalWeather();
  }

  public async getLocalWeather(): Promise<void>{
    navigator.geolocation.getCurrentPosition( async (pos) => {
      try{
        const fetched = await this._apiService.getTemp(pos.coords.latitude, pos.coords.longitude)
        this.weather.icon += fetched.weather[0].icon + ".png";
        this.weather.city = fetched.name;
        this.weather.type = fetched.weather[0].description.split(" ").map( (word: any) => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
        this.weather.temp = Math.round(fetched.main.temp);
        this.loadedWeather = true;
      }catch(error){
        this.errorWeather = true;
        this.loadedWeather = true;
      }
    },
      () =>{
        this.errorWeather = true;
        this.loadedWeather = true;
      }
    );
  }


}
