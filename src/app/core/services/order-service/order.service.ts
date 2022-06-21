import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Orders} from "../../models/orders";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http : HttpClient) { }

  getAllOrders() : Observable<Orders[]>{
    return this.http.get<Orders[]>('http://localhost:3000/Orders');
  }

  postNewOrder(newOrder : Orders) : Observable<Orders>{
    return this.http.post<Orders>('http://localhost:3000/Orders', newOrder);
  }

  patchOrder(id: number, newOrder : Orders) : Observable<Orders>{
    return this.http.patch<Orders>('http://localhost:3000/Orders/'+id, newOrder);
  }

  deleteOrder(id : number) : Observable<Orders>{
    return this.http.delete<Orders>('http://localhost:3000/Orders/'+id);
  }


}
