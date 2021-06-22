import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { HttpClientModule } from '@angular/common/http';
import { DayPreviewComponent } from './cmps/day-preview/day-preview.component';
import { FormsModule } from '@angular/forms';
import { DayListComponent } from './cmps/day-list/day-list.component';
import { FavListComponent } from './pages/fav-list/fav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    AppHeaderComponent,
    DayPreviewComponent,
    DayListComponent,
    FavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
