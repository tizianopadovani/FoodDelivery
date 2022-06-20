import {Menu} from "./menu";

export interface Restaurant {
  "id": number,
  "name" : string,
  "menu": Menu[],
  "address": string,
  "phone": string
}
