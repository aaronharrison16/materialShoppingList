import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ListItem } from '../shared/list-item.model';

@Injectable()
export class ShoppingListService {
  constructor(private http: HttpClient) { }
  shoppingListUrl = "https://shopping-list-material.firebaseio.com/shopping-list.json";  
  items: ListItem[] = []

  getItems() {
    return this.http.get<ListItem>(this.shoppingListUrl)
  }

  addItem(item: ListItem): Observable<ListItem> {
    return this.http.post<ListItem>(this.shoppingListUrl, item);
  }

  updateItem(items: ListItem[]) {
    return this.http.put(this.shoppingListUrl, items);
  }

  deleteItem(items: ListItem[]): Observable<{}> {
    return this.http.put(this.shoppingListUrl, items);
  }

  clearItems() {
    return this.http.put(this.shoppingListUrl, this.items);
  }
}