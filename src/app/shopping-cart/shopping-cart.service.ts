import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ShoppingCartService {

  constructor(public db:AngularFirestore) { }

  getCartItems() {
    return this.db.collection('shopping-cart').snapshotChanges();
  }

  addItem(name) {
    return this.db.collection('shopping-cart').add({
      name: name
    })
  }

  deleteCartItem(itemKey) {
    return this.db.collection('shopping-cart').doc(itemKey).delete()
  }

  updateCartItem( itemKey, value ) {
    return this.db.collection('shopping-cart').doc(itemKey).set({ name: value });
  }

  clearCartItems(cartItems) {
    for (let item of cartItems) {
      this.db.collection('shopping-cart').doc(item.payload.doc.id).delete();
    }
  }
}