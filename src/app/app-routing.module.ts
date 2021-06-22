import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavListComponent } from './pages/fav-list/fav-list.component';
import { WeatherComponent } from './pages/weather/weather.component';

const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full'},
  { path: 'favorite', component: FavListComponent},
  { path: 'weather', component: WeatherComponent},
  { path: 'weather/:key/:name', component: WeatherComponent},
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
