import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherData } from 'src/app/interfaces/weather-data';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  favs: WeatherData[]
  subscription: Subscription

  ngOnInit(): void {
    this.subscription = this.weatherService.favs$.subscribe(favs => this.favs = favs)
      this.weatherService.getFavs()
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
