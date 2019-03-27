import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ListItem } from '../shared/list-item.model';
import { ShoppingCartService } from './shopping-cart.service';
import { DialogDeleteComponent } from '../shopping-list/dialog-delete/dialog-delete.component';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  cartItems: ListItem[];
  index: number;
  form: NgForm
  editMode = false;

  constructor(private scService: ShoppingCartService, private slService: ShoppingListService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.cartItems = this.scService.getCartItems();
    this.subscription = this.scService.cartItemsChanged
      .subscribe(
        (cartItems: ListItem[]) => {
          this.cartItems = cartItems;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onShoppingCartRemove(item: ListItem, index) {
    this.slService.addItem(item);
    this.scService.deleteCartItem(index);
    this.snackbar.open('The Item has been removed from the cart and is back on your list.', 'Dismiss', {duration: 4000})
  }

  onDelete(index) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scService.deleteCartItem(index);
      }
    });
  }

  onEdit(index, form) {
    const cartItem = new ListItem(form.value.name);
    this.scService.updateCartItem(index, cartItem);
    this.editMode= false
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scService.clearCartItems();
      }
    });
  }
}
