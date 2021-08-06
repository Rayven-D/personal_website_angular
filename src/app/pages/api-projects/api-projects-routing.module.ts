import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WeatherAppComponent } from './weather-app/weather-app.component';


const routes: Routes = [
  {path: 'api-projects/weather-app', component: WeatherAppComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ApiProjectsRoutingModule { }
