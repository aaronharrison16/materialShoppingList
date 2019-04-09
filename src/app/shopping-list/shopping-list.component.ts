import { Component, OnInit } from '@angular/core';
import { ListItem } from '../shared/list-item.model';
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

export class ShoppingListComponent implements OnInit {
  items: ListItem[];
  index: number;
  form: NgForm;
  item: ListItem;
  editMode = false;
  
  constructor(private slService: ShoppingListService, private scService: ShoppingCartService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.slService.getItems()
      .subscribe(item => {
        if (item !== null ) {
          this.items = Object.values(item);
        }
      });
  }

  onAddItem(form) {
    const newItem = new ListItem(form.value.name)
    this.items.push(newItem);
    this.slService.addItem(newItem).subscribe(item => this.items)
    form.reset();
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items = this.items.filter(i => i !== item)
        this.slService.deleteItem(this.items).subscribe();
      }
    });
  }

  onEdit(index, form) {
    const item = new ListItem(form.value.name);
    this.items[index] = item;
    this.slService.updateItem(this.items).subscribe();
    this.editMode = false;
  }

  onShoppingCartAdd(item) {
    this.scService.addItem(item).subscribe();
    this.items = this.items.filter(i => i !== item)
    this.slService.deleteItem(this.items).subscribe();
    this.snackbar.open('The item has been moved to your cart.', 'Dismiss', { duration: 3000 });
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items = []
        this.slService.clearItems().subscribe();
      }
    });
  }
}