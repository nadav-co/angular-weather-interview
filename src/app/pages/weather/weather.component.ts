import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { WeatherData } from 'src/app/interfaces/weather-data';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],

})
export class WeatherComponent implements OnInit {

  weatherData: WeatherData
  searchRes: any
  timeout: any
  searchValue: string
  subscriptions: Subscription[] = []

  constructor(private _change: ChangeDetectorRef, private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.weatherService.weatherData$.subscribe(data => {
      this.weatherData = data
    }))
    this.subscriptions.push(this.weatherService.searchRes$.subscribe(data => {
      this.searchRes = data
    }))
    this.subscriptions.push(this.route.params.subscribe(params => {
      const { name, key } = params
      this.searchRes = null
      this.searchValue = null
      if (name && key) this.weatherService.getByKey(key, name)
      else this.getByLocation()
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe())
  }

  getByLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.weatherService.getByGeoPos(pos)
        this._change.markForCheck()
      })
    } else {
      this.weatherService.getByKey('215854', 'tel aviv')

    }
  }

  handleChange() {
    this.timeout && clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      console.log('searching');

      this.weatherService.search(this.searchValue)
    }, 500)
  }
  async toggleFav() {
    const data = {...this.weatherData}
    this.weatherData = data.isFav ? await this.weatherService.removeFromFavs(data) : await this.weatherService.addToFavs(data)
  }

}
