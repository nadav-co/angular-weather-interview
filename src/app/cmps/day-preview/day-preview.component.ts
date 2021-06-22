import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DailyForcast } from 'src/app/interfaces/weather-data';

@Component({
  selector: 'day-preview',
  templateUrl: './day-preview.component.html',
  styleUrls: ['./day-preview.component.scss']
})
export class DayPreviewComponent implements OnInit {
  @Input() forecast: DailyForcast
  constructor() { }

  ngOnInit(): void {
    
  } 

  get temp(){
    const { Maximum, Minimum } = this.forecast.Temperature
    return Math.floor((((Maximum.Value + Minimum.Value) / 2) - 32) / 1.8)
  }
  get date() {
    return moment(this.forecast.Date).format('ddd D/M/Y')
  }
  get imgUrl(){
    const imgNum = this.forecast.Day.Icon.toString().padStart(2, '0')
    return `https://developer.accuweather.com/sites/default/files/${imgNum}-s.png`
  }

}
