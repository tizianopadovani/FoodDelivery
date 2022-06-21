import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from "../../core/models/restaurant";
import {Subscription} from "rxjs";
import {RestaurantService} from "../../core/services/restaurant-service/restaurant.service";

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {

  restaurantList : Restaurant[];
  restaurantSubscription : Subscription;
  postRestaurantSubscription : Subscription;
  patchRestaurantSubscription : Subscription;



  constructor(private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(){
    this.restaurantSubscription = this.restaurantService.getAllRestaurants().subscribe(
      observer => {this.restaurantList = [...observer]},
      error => {console.log(error)},
      () => {console.log("Caricamento Ristoranti eseguito!")}
    )
  }

  postNewRestaurant() {
    const newRestaurant : Restaurant = {
      id: this.restaurantList.length+1,
      name: 'Nuovo Ristorante Paradiso',
      menu: [
        {
          id: 1,
          name: 'Nuovo Menu',
          ingredients: 'Roba nuova',
          price: 9.99
        }
      ],
      address: 'Via Nuova',
      phone: '06 0000 0000'
    }

    this.postRestaurantSubscription = this.restaurantService.postNewRestaurant(newRestaurant).subscribe(
      observer => {this.getAllRestaurants()},
      error => {console.log('Aggiunta andata male')},
      () => {console.log('Nuovo Ristorante aggiunto!')})
  }

  postNewDish(index : number) {
    const newDish =
      {
        id: this.restaurantList[index].menu.length + 1,
        name: 'Nuovo Piatto',
        ingredients: 'Nuovi Ingredienti',
        price: 9.99
      }
    let {menu} = this.restaurantList[index];
    menu = [...menu, newDish];
    this.restaurantList[index].menu = menu;
    this.postRestaurantSubscription = this.restaurantService.patchRestaurantsDish(this.restaurantList[index] ,index).subscribe(
      observer => {this.getAllRestaurants()},
      error => {console.log('Aggiunta andata male')},
      () => {console.log('Nuovo Piatto aggiunto!')})
  }


  ngOnDestroy(): void {
    this.restaurantSubscription?.unsubscribe();
    this.postRestaurantSubscription?.unsubscribe();
    this.patchRestaurantSubscription?.unsubscribe();
  }

}
