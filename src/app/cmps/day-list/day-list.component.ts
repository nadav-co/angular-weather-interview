import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DailyForcast } from 'src/app/interfaces/weather-data';

@Component({
  selector: 'day-list',
  templateUrl: './day-list.component.html',
  styleUrls: ['./day-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayListComponent implements OnInit {

  @Input() forecasts: DailyForcast[]

  constructor() { }

  ngOnInit(): void {
  }

}
