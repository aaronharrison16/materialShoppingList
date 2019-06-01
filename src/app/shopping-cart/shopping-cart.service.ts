import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ShoppingCartService {

  userId: string

  constructor(
    public db:AngularFirestore, 
    private authService:AuthService
  ) { 
    this.authService.user$.subscribe(user => this.userId = user.uid)
  }
  

  getCartItems() {
    return this.db.collection(`users/${this.userId}/shopping-cart`).snapshotChanges();
  }

  addItem(name) {
    return this.db.collection(`users/${this.userId}/shopping-cart`).add({
      name: name
    })
  }

  deleteCartItem(itemKey) {
    return this.db.collection(`users/${this.userId}/shopping-cart`).doc(itemKey).delete()
  }

  updateCartItem( itemKey, value ) {
    return this.db.collection(`users/${this.userId}/shopping-cart`).doc(itemKey).set({ name: value });
  }

  clearCartItems(cartItems) {
    for (let item of cartItems) {
      this.db.collection(`users/${this.userId}/shopping-cart`).doc(item.payload.doc.id).delete();
    }
  }
}