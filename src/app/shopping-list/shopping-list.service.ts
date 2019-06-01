import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ShoppingListService {

  userId: string;
  
  constructor(
    public db:AngularFirestore,  
    private authService:AuthService
  ) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      } else {
        this.userId = null;
      }
    })
  }

  getItems() {
    return this.db.collection(`users/${this.userId}/shopping-list`).snapshotChanges();
  }

  addItem(value) {
    return this.db.collection(`users/${this.userId}/shopping-list`).add({
      name: value.value.name,
    })
  }

  deleteItem(itemKey) {
    return this.db.collection(`users/${this.userId}/shopping-list`).doc(itemKey).delete();
  }

  updateItem(itemKey, value) {
    return this.db.collection(`users/${this.userId}/shopping-list`).doc(itemKey).set({name: value});
  }

  clearItems(items) {
    for(let item of items) {
      this.db.collection(`users/${this.userId}/shopping-list`).doc(item.payload.doc.id).delete();  
    }
  }

  returnToList(item) {
    return this.db.collection(`users/${this.userId}/shopping-list`).add({
      name: item
    })
  }
}