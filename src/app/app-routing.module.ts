import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)},
  {path: 'restaurants', loadChildren: () => import('./features/restaurants-list/restaurants-list.module').then(m => m.RestaurantsListModule)},
  {path: 'order', loadChildren: () => import('./features/order-page/order-page.module').then(m => m.OrderPageModule)},
  {path: '**' , redirectTo: 'home', pathMatch: 'full'},
  {path: '' , redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

