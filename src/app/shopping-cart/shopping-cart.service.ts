import { ListItem } from '../shared/list-item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingCartService {
  shoppingCartUrl = "https://shopping-list-material.firebaseio.com/shopping-cart.json";
  cartItemsChanged = new Subject<ListItem[]>();
  private cartItemEmpty: ListItem[] = [];

  constructor(private http: HttpClient) { }

  getCartItems() {
    return this.http.get<ListItem>(this.shoppingCartUrl);
  }

  addItem(item: ListItem) {
    return this.http.post(this.shoppingCartUrl, item);
  }

  deleteCartItem(cartItems: ListItem[]) {
    return this.http.put(this.shoppingCartUrl, cartItems);
  }

  updateCartItem( cartItems: ListItem[] ) {
    return this.http.put(this.shoppingCartUrl, cartItems );
  }

  clearCartItems() {
    return this.http.put(this.shoppingCartUrl, this.cartItemEmpty);
  }
}