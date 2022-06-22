import {Component, OnDestroy, OnInit} from '@angular/core';
import {Restaurant} from "../../core/models/restaurant";
import {Subscription} from "rxjs";
import {RestaurantService} from "../../core/services/restaurant-service/restaurant.service";
import {FormControl, FormGroup} from "@angular/forms";

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
  restaurantForm: FormGroup;
  isVisible: boolean = false;
  isVisibleMenu: boolean = false;
  menuForm: FormGroup;



  constructor(private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
    this.restaurantForm = new FormGroup({
      id: new FormControl (this.restaurantList?.length+1),
      name: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
    });
    this.menuForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      ingredients: new FormControl(''),
      price: new FormControl(''),
    })
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
      id: this.restaurantForm.get('id')?.value,
      name: this.restaurantForm.get('name')?.value,
      menu: [],
      address: this.restaurantForm.get('address')?.value,
      phone: this.restaurantForm.get('phone')?.value
    }

    this.postRestaurantSubscription = this.restaurantService.postNewRestaurant(newRestaurant).subscribe(
      observer => {this.getAllRestaurants()},
      error => {console.log('Aggiunta andata male')},
      () => {console.log('Nuovo Ristorante aggiunto!')})

    this.restaurantForm.reset();
  }

  postNewDish(index : number) {
    const newDish =
      {
        id: this.restaurantList[index].menu.length + 1,
        name: this.menuForm.get('name')?.value,
        ingredients: this.menuForm.get('ingredients')?.value,
        price: this.menuForm.get('price')?.value,
      }
    let {menu} = this.restaurantList[index];
    menu = [...menu, newDish];
    this.restaurantList[index].menu = menu;
    this.postRestaurantSubscription = this.restaurantService.patchRestaurantsDish(this.restaurantList[index] ,index).subscribe(
      observer => {this.getAllRestaurants()},
      error => {console.log('Aggiunta andata male')},
      () => {console.log('Nuovo Piatto aggiunto!')})

    this.changeVisibilityMenu();
    this.menuForm.reset();
  }

  changeVisibility() {
    this.isVisible = !this.isVisible;
  }

  changeVisibilityMenu() {
    this.isVisibleMenu = !this.isVisibleMenu;
  }

  ngOnDestroy(): void {
    this.restaurantSubscription?.unsubscribe();
    this.postRestaurantSubscription?.unsubscribe();
    this.patchRestaurantSubscription?.unsubscribe();
  }
}
