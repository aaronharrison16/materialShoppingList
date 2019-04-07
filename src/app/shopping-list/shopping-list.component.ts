import { Component, OnInit } from '@angular/core';
import { ListItem } from '../shared/list-item.model';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { NgForm } from '@angular/forms';
import { ClearDialogComponent } from '../clear-dialog/clear-dialog.component';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  itemsChanged = new Subject<ListItem[]>();
  items: ListItem[];
  itemsKeys: string[]
  index: number;
  form: NgForm;
  editMode = false;
  
  constructor(private slService: ShoppingListService, private scService: ShoppingCartService, private snackbar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.slService.getItems()
      .subscribe(item => {
        this.items = Object.values(item);
        this.itemsKeys = Object.keys(item);
      });
  }

  onAddItem(form: NgForm) {
    const newItem = new ListItem(form.value.name)
    this.items.push(newItem);
    this.itemsChanged.next(this.items.slice());
    this.slService.addItem(newItem).subscribe(item => this.items)
    form.reset();
  }

  onDelete(item: ListItem) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.items = this.items.filter(i => i !== item)
        this.slService.deleteItem(this.items).subscribe();
        this.itemsChanged.next(this.items.slice());
      }
    });
  }

  onEdit(index, form) {
    const item = new ListItem(form.value.name);
    this.items[index] = item;
    this.slService.updateItem(this.items).subscribe();
    this.editMode = false;
  }

  onShoppingCartAdd(item: ListItem, index) {
    this.scService.addItem(item);
    this.slService.deleteItem(index);
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
