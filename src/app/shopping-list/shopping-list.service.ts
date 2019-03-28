import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { ListItem } from '../shared/list-item.model';

@Injectable()
export class ShoppingListService {
  constructor(private http: HttpClient) { }
  shoppingListUrl = "https://shopping-list-material.firebaseio.com/shopping-list.json";  
  
  itemsChanged = new Subject<ListItem[]>();
  items: ListItem[] = [
    new ListItem('Apples'),
    new ListItem('Tomatoes'),
    new ListItem('Pears'),
  ];

  getItems() {
    return this.items.slice();
  }

  addItem(item: ListItem) {
    this.items.push(item);
    this.itemsChanged.next(this.items.slice());
    return this.http.put(this.shoppingListUrl, this.getItems());
  }

  updateItem(index: number, item: ListItem) {
    this.items[index] = item;
    this.itemsChanged.next(this.items.slice());
    return this.http.put(this.shoppingListUrl, this.getItems());
  }

  deleteItem(index: number): Observable<{}> {
    this.items.splice(index, 1);
    this.itemsChanged.next(this.items.slice());
    return this.http.put(this.shoppingListUrl, this.getItems());
  }

  clearItems() {
    this.itemsChanged.next(this.items = []);
    return this.http.put(this.shoppingListUrl, this.getItems());
  }
}