import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from './shopping-list.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { ClearDialogComponent } from '../shared/clear-dialog/clear-dialog.component';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit {
  items: Array<any>;
  editMode = false;
  
  constructor(
    private slService: ShoppingListService, 
    private scService: ShoppingCartService, 
    private snackbar: MatSnackBar, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.slService.getItems()
      .subscribe(result => {
        this.items = result;
      })
  }

  onAddItem(form) {
    this.slService.addItem(form);
    form.reset();
  }

  onDelete(item) {
    const dialogRef = this.dialog.open(DialogDeleteComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slService.deleteItem(item.payload.doc.id);
      }
    });
  }

  onEdit(item, formValue) {
    this.slService.updateItem(item.payload.doc.id, formValue.value.name)
    this.editMode = false;
  }

  onShoppingCartAdd(item) {
    this.scService.addItem(item.payload.doc.data().name);
    this.slService.deleteItem(item.payload.doc.id);
    this.snackbar.open('The item has been moved to your cart.', 'Dismiss', { duration: 3000 });
  }

  onClear() {
    const dialogRef = this.dialog.open(ClearDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.slService.clearItems(this.items);
      }
    });
  }
}