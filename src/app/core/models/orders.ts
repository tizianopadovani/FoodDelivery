import {Menu} from "./menu";
import {Restaurant} from "./restaurant";

export interface Orders {
  "id" : number,
  "restaurant" : Restaurant,
  "menu" : Menu,
  "quantity" : number
}
