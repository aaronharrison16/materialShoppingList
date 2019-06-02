import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ShoppingListService {
 
  constructor(
    public db:AngularFirestore,  
    private authService:AuthService
  ) { }

  getItems() {
    return this.db.collection(`users/${this.authService.userId}/shopping-list`).snapshotChanges();
  }

  addItem(value) {
    return this.db.collection(`users/${this.authService.userId}/shopping-list`).add({
      name: value.value.name,
    })
  }

  deleteItem(itemKey) {
    return this.db.collection(`users/${this.authService.userId}/shopping-list`).doc(itemKey).delete();
  }

  updateItem(itemKey, value) {
    return this.db.collection(`users/${this.authService.userId}/shopping-list`).doc(itemKey).set({name: value});
  }

  clearItems(items) {
    for(let item of items) {
      this.db.collection(`users/${this.authService.userId}/shopping-list`).doc(item.payload.doc.id).delete();  
    }
  }

  returnToList(item) {
    return this.db.collection(`users/${this.authService.userId}/shopping-list`).add({
      name: item
    })
  }
}