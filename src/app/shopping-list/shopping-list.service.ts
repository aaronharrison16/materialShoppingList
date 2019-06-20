import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

@Injectable()
export class ShoppingListService {
  private shoppingList= `users/${this.authService.userId}/shopping-list`;
 
  constructor(
    public db:AngularFirestore,  
    private authService:AuthService
  ) { }

  getItems() {
    return this.db.collection(this.shoppingList).snapshotChanges();
  }

  addItem(value) {
    return this.db.collection(this.shoppingList).add({
      name: value.value.name,
    })
  }

  deleteItem(itemKey) {
    return this.db.collection(this.shoppingList).doc(itemKey).delete();
  }

  updateItem(itemKey, value) {
    return this.db.collection(this.shoppingList).doc(itemKey).set({name: value});
  }

  clearItems(items) {
    for(let item of items) {
      this.db.collection(this.shoppingList).doc(item.payload.doc.id).delete();  
    }
  }

  returnToList(item) {
    return this.db.collection(this.shoppingList).add({
      name: item
    })
  }
}