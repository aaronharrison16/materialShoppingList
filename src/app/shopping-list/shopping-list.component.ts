import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItem } from '../shared/list-item.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { NgForm } from '@angular/forms';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private subscription: Subscription
  items: ListItem[];
  index: number;
  form: NgForm;
  editMode = false;
  
  constructor(private slService: ShoppingListService, private scService: ShoppingCartService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.slService.getItems()
      .subscribe(item => {this.items = item});
    this.subscription = this.slService.itemsChanged
      .subscribe(
        (items: ListItem[]) => {
          this.items = items;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const newItem = new ListItem(form.value.name)
    this.slService.addItem(newItem).subscribe(item => this.ite)
    form.reset();
  }

  onShoppingCartAdd(item: ListItem, index) {
    this.scService.addItem(item);
    this.slService.deleteItem(index);
    this.snackbar.open('The item has been moved to your cart.', 'Dismiss', {duration: 3000});
  }

  onDelete(index) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slService.deleteItem(index).subscribe();
      }
    });
  }

  onEdit(index, form) {
    const value = form.value;
    const item = new ListItem(value.name);
    this.slService.updateItem(index, item).subscribe();
    this.editMode = false;
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slService.clearItems().subscribe();
      }
    });
  }
}
