import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class ShoppingListService {
  
  constructor(public db:AngularFirestore) { }

  getItems() {
    return this.db.collection('shopping-list').snapshotChanges();
  }

  addItem(value) {
    return this.db.collection('shopping-list').add({
      name: value.value.name
    })
  }

  deleteItem(itemKey) {
    return this.db.collection('shopping-list').doc(itemKey).delete()
  }

  updateItem(itemKey, value) {
    return this.db.collection('shopping-list').doc(itemKey).set({name: value});
  }

  clearItems() {
  }

  returnToList(item) {
    return this.db.collection('shopping-list').add({
      name: item
    })
  }
}