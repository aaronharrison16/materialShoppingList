import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const appRoutes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }