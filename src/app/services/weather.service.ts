import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WeatherData } from '../interfaces/weather-data';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private _weatherData$ = new BehaviorSubject<any>(null)
  public weatherData$ = this._weatherData$.asObservable()
  private _searchRes$ = new BehaviorSubject<any>(null)
  public searchRes$ = this._searchRes$.asObservable()
  private _favs$ = new BehaviorSubject<any>(null)
  public favs$ = this._favs$.asObservable()

  constructor(private storageService: StorageService, private http: HttpClient) { }

  async getByKey(key: string, name: string) {
    var data = await this.storageService.query(key)
    if (!data || (Date.now() - data.createdAt) > 1000 * 60 * 60 * 12) {
      const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=NbpG1xdig88K9YXvhE0CKrbeFfXcdLUv`
      const res = await this.http.get(url).toPromise()
      data = { ...res, createdAt: Date.now(), name, key }
      this.storageService.save(key, data)
    }
    this._weatherData$.next(data)
    return data
  }

  async getByGeoPos(geoPos: any) {
    var posKey = await this.storageService.query('userPosKey') //Incorrect if user changes position.. just for api block
    if (!posKey) {
      const latlng = `${geoPos.coords.latitude},${geoPos.coords.longitude}`
      const url = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=NbpG1xdig88K9YXvhE0CKrbeFfXcdLUv&q=${latlng}`
      const location: any = await this.http.get(url).toPromise()
      posKey = location.Key
      this.storageService.save('userPosKey', posKey)
    }
    return await this.getByKey(posKey, 'My Location')
  }

  async search(val: string) {
    var res = await this.storageService.query(val)
    if (!res) {
      const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=NbpG1xdig88K9YXvhE0CKrbeFfXcdLUv&q=${val}`
      res = await this.http.get(url).toPromise()
      this.storageService.save(val, res)
    }
    this._searchRes$.next(res)
    return res
  }

  async addToFavs(location: WeatherData) {
    const {name, key} = location
    this.storageService.saveToArr('favs', {name, key})
    const newLocation = { ...location, isFav: true }
    this.storageService.save(location.key, newLocation)
    return newLocation
  }

  async removeFromFavs(location: WeatherData) {
    this.storageService.remove('favs', location.key)
    const newLocation = { ...location, isFav: false }
    this.storageService.save(location.key, newLocation)
    return newLocation
  }

  async getFavs() {
    const favs = await this.storageService.query('favs')
    this._favs$.next(favs)
    return favs
  }
}
