import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ShoppingCartService } from './shopping-cart.service';
import { DialogDeleteComponent } from '../shopping-list/dialog-delete/dialog-delete.component';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})

export class ShoppingCartComponent implements OnInit {
  cartItems: Array<any>;
  editMode = false;

  constructor(
    private scService: ShoppingCartService, 
    private slService: ShoppingListService, 
    private snackbar: MatSnackBar, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.scService.getCartItems()
      .subscribe(result => {
        this.cartItems = result;
      })
  }

  onShoppingCartRemove(item) {
    this.slService.returnToList(item.payload.doc.data().name);
    this.scService.deleteCartItem(item.payload.doc.id);
    this.snackbar.open('The Item has been removed from the cart and is back on your list.', 'Dismiss', {duration: 4000})
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scService.deleteCartItem(item.payload.doc.id);
      }
    });
  }

  onEdit(item, formValue) {
    this.scService.updateCartItem(item.payload.doc.id, formValue.value.name);
    this.editMode = false;
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.scService.clearCartItems(this.cartItems);
      }
    });
  }
}