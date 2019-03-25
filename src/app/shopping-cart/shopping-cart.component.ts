import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private snackbar: MatSnackBar) { }

  ngOnInit() {
  }

  onShoppingCartRemove() {
    this.snackbar.open('The Item has been removed from the cart and is back on your list.', 'Dismiss', {duration: 4000})
  }

}
