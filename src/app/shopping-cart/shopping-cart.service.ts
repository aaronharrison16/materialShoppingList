import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ShoppingCartService {
  private shoppingCart = `users/${this.authService.userId}/shopping-cart`;

  constructor(
    public db:AngularFirestore, 
    private authService:AuthService
  ) { }
  

  getCartItems() {
    return this.db.collection(this.shoppingCart).snapshotChanges();
  }

  addItem(name) {
    return this.db.collection(this.shoppingCart).add({
      name: name
    })
  }

  deleteCartItem(itemKey) {
    return this.db.collection(this.shoppingCart).doc(itemKey).delete()
  }

  updateCartItem( itemKey, value ) {
    return this.db.collection(this.shoppingCart).doc(itemKey).set({ name: value });
  }

  clearCartItems(cartItems) {
    for (let item of cartItems) {
      this.db.collection(this.shoppingCart).doc(item.payload.doc.id).delete();
    }
  }
}