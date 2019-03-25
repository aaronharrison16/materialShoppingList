import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { ListItem } from 'src/app/shared/list-item.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor( private slService: ShoppingListService ) { }

  ngOnInit() {
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newItem = new ListItem(value.name)
    this.slService.addItem(newItem);
    console.log(newItem)
    form.reset()
  }
}
