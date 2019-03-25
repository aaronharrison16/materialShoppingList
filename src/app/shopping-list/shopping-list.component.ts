import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItem } from '../shared/list-item.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  items: ListItem[];
  private subscription: Subscription

  constructor(private slservice: ShoppingListService, private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.items = this.slservice.getItems();
    this.subscription = this.slservice.itemsChanged
      .subscribe(
        (items: ListItem[]) => {
          this.items = items
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onShoppingCartAdd() {
    this.snackbar.open('The item has been moved to your cart.', 'Dismiss', {duration: 3000});
  }

  onEditItem(index: number) {
    this.slservice.startedEditing.next(index)
  }
}
