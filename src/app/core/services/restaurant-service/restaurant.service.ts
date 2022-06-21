import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Restaurant} from "../../models/restaurant";
import {Menu} from "../../models/menu";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http : HttpClient) { }

  getAllRestaurants() : Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>('http://localhost:3000/Restaurants');
  }

  postNewRestaurant(newRestaurant : Restaurant) : Observable<Restaurant> {
    return this.http.post<Restaurant>('http://localhost:3000/Restaurants', newRestaurant);
  }

  patchRestaurantsDish(newDish: Restaurant, index: number) : Observable<Restaurant> {
    return this.http.patch<Restaurant>('http://localhost:3000/Restaurants/' + (index+1), newDish);
  }
}
