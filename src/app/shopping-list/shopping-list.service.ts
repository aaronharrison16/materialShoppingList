import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ShoppingListService {

  userId: string;
  
  constructor(public db:AngularFirestore, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid
    })
  }

  getItems() {
    console.log(this.userId)
    return this.db.collection(`items/${this.userId}/shopping-list`).snapshotChanges();
  }

  addItem(value) {
    return this.db.collection(`items/${this.userId}/shopping-list`).add({
      name: value.value.name,
    })
  }

  deleteItem(itemKey) {
    return this.db.collection(`items/${this.userId}/shopping-list`).doc(itemKey).delete();
  }

  updateItem(itemKey, value) {
    return this.db.collection(`items/${this.userId}/shopping-list`).doc(itemKey).set({name: value});
  }

  clearItems(items) {
    for(let item of items) {
      this.db.collection(`items/${this.userId}/shopping-list`).doc(item.payload.doc.id).delete();  
    }
  }

  returnToList(item) {
    return this.db.collection(`items/${this.userId}/shopping-list`).add({
      name: item
    })
  }
}