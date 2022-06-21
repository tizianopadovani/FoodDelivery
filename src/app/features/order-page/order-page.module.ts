import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './order-page.component';
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";

const routes : Routes = [
  {path:'', component:OrderPageComponent}
]

@NgModule({
  declarations: [
    OrderPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports: [
    OrderPageComponent
  ]
})
export class OrderPageModule { }
