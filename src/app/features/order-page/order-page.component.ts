import {Component, OnDestroy, OnInit} from '@angular/core';
import {Orders} from "../../core/models/orders";
import {Subscription} from "rxjs";
import {OrderService} from "../../core/services/order-service/order.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Restaurant} from "../../core/models/restaurant";
import {RestaurantService} from "../../core/services/restaurant-service/restaurant.service";
import {Menu} from "../../core/models/menu";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  ordersList : Orders[];
  restaurantList : Restaurant[];
  menuList : Menu[];

  orderSubscription : Subscription;
  postOrderSubscription : Subscription;

  orderForm: FormGroup;
  order: Orders;

  constructor(private orderService : OrderService, private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.restaurantService.getAllRestaurants().subscribe(res => {this.restaurantList = res});
    this.restaurantService.getAllRestaurants().subscribe(res => {res.map(r => this.menuList = r.menu)});

    this.orderForm = new FormGroup({
      id: new FormControl(this.ordersList.length + 1),
      restaurant: new FormControl(''),
      menu: new FormControl(''),
      quantity: new FormControl('')
    })
  }

  getAllOrders(){
    this.orderSubscription = this.orderService.getAllOrders().subscribe(
      observer => {this.ordersList = [...observer]},
      error => {console.log(error)},
      () => {console.log("Caricamento Ordini eseguito!")}
    )
  }

  postNewOrder(order : Orders){
    this.postOrderSubscription = this.orderService.postNewOrder(order).subscribe(
      observer => {this.getAllOrders()},
      error => {console.log('Aggiunta andata male')},
      () => {console.log('Nuovo Ordine aggiunto!')})
  }

  addOrder() {
    const newOrder = this.orderForm.value as Orders;
    this.ordersList = [...this.ordersList, newOrder];
    this.postNewOrder(newOrder);
    this.orderForm.reset()
  }

  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
    this.postOrderSubscription?.unsubscribe();
  }
}
