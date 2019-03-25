import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListItem } from '../shared/list-item.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  slForm: NgForm;
  items: ListItem[];
  editMode = false
  private subscription: Subscription

  constructor(private slService: ShoppingListService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.items = this.slService.getItems();
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

  onShoppingCartAdd() {
    this.snackbar.open('The item has been moved to your cart.', 'Dismiss', {duration: 3000});
  }

  onDelete(index: number) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slService.deleteItem(index);
      }
    });
  }

  onEditStart(index: number) {
    this.editMode = true;
  }

  onEditSubmit(index: number, form: NgForm) {
    const value = form.value;
    const item = new ListItem(value.name);
    this.slService.updateItem(index, item);
    this.editMode = false;
  }
}
