import { ListItem } from '../shared/list-item.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
  itemsChanged = new Subject<ListItem[]>();
  private items: ListItem[] = [
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
  }

  addItems(items: ListItem[]) {
    this.items.push(...items);
    this.itemsChanged.next(this.items.slice())
  };

  updateItem(index: number, item: ListItem) {
    this.items[index] = item;
    this.itemsChanged.next(this.items.slice());
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
    this.itemsChanged.next(this.items.slice())
  }
}