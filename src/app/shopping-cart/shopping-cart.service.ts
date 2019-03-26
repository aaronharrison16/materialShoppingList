import { ListItem } from '../shared/list-item.model';
import { Subject } from 'rxjs';


export class ShoppingCartService {
  cartItemsChanged = new Subject<ListItem[]>();
  private cartItems: ListItem[] = [
    new ListItem('Bread'),
    new ListItem('Honey'),
    new ListItem('Ground Beef')
  ];

  getCartItems() {
    return this.cartItems.slice();
  }

  deleteCartItem(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItemsChanged.next(this.cartItems.slice());
  }

  updateCartItem(index: number, cartItem: ListItem) {
    this.cartItems[index] = cartItem;
    this.cartItemsChanged.next(this.cartItems.slice());
  }
}