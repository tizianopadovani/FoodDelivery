import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantsListComponent } from './restaurants-list.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes : Routes = [
  {path: '', component: RestaurantsListComponent}
]

@NgModule({
  declarations: [
    RestaurantsListComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule
    ],
  exports: [
    RestaurantsListComponent
  ]
})
export class RestaurantsListModule { }
