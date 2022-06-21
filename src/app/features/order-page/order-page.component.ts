import {Component, OnDestroy, OnInit} from '@angular/core';
import {Orders} from "../../core/models/orders";
import {Subscription} from "rxjs";
import {OrderService} from "../../core/services/order-service/order.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Restaurant} from "../../core/models/restaurant";
import {RestaurantService} from "../../core/services/restaurant-service/restaurant.service";


@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {

  ordersList : Orders[];
  restaurantList : Restaurant[];

  orderSubscription : Subscription;
  postOrderSubscription : Subscription;
  manageOrderSubscription : Subscription;

  orderForm: FormGroup;
  order: Orders;
  selectedRestaurant: Restaurant;

  constructor(private orderService : OrderService, private restaurantService : RestaurantService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.restaurantService.getAllRestaurants().subscribe(res => {this.restaurantList = res});


    this.orderForm = new FormGroup({
      id: new FormControl(this.ordersList?.length + 1),
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
    this.orderForm.reset();
  }

  manageOrder(){

    if(!this.order || this.ordersList.includes(this.order)){
      this.addOrder();
    }else{
      this.editOrder(this.order.id)
    }
  }

  deleteOrder(id: number) {
    this.manageOrderSubscription = this.orderService.deleteOrder(id).subscribe(
      observer => {this.getAllOrders()},
      error => {console.log('Non è stato possibile cancellare questo ordine')},
      () => {console.log('Ordine cancellato con successo!')})
  }

  editOrder(id: number) {
    const newOrder = this.orderForm.value as Orders;
    this.manageOrderSubscription = this.orderService.patchOrder(id, newOrder).subscribe(
      observer => {this.getAllOrders()},
      error => {console.log('Non è stato possibile modificare questo ordine')},
      () => {console.log('Ordine modificato con successo!')}
    )
    this.orderForm.reset();
  }

  setOrder(order: Orders) {
    this.orderForm.patchValue(order);
    this.order = {...order};
  }
  ngOnDestroy(): void {
    this.orderSubscription?.unsubscribe();
    this.postOrderSubscription?.unsubscribe();
    this.manageOrderSubscription?.unsubscribe();
  }


}
