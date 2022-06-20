import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsListComponent } from './restaurants-list.component';
import {RouterModule, Routes} from "@angular/router";

const routes : Routes = [
  {path: '', component: RestaurantsListComponent}
]

@NgModule({
  declarations: [
    RestaurantsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RestaurantsListComponent
  ]
})
export class RestaurantsListModule { }
