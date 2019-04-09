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
export class ShoppingCartComponent implements OnInit {
  private subscription: Subscription
  cartItems: ListItem[];
  item: ListItem;
  index: number;
  form: NgForm
  editMode = false;

  constructor(private scService: ShoppingCartService, private slService: ShoppingListService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.scService.getCartItems().subscribe(
      item => { 
        if (item !== null) {
          this.cartItems = Object.values(item)
        }
      });
  }

  onShoppingCartRemove(item) {
    this.slService.addItem(item).subscribe();
    this.cartItems = this.cartItems.filter(i => i !== item)
    this.scService.deleteCartItem(this.cartItems).subscribe();
    this.snackbar.open('The Item has been removed from the cart and is back on your list.', 'Dismiss', {duration: 4000})
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartItems = this.cartItems.filter(i => i !== item)
        this.scService.deleteCartItem(this.cartItems).subscribe();
      }
    });
  }

  onEdit(index, form) {
    const cartItem = new ListItem(form.value.name);
    this.cartItems[index] = cartItem;
    this.scService.updateCartItem(this.cartItems).subscribe();
    this.editMode= false
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scService.clearCartItems().subscribe();
        this.cartItems = []
      }
    });
  }
}
