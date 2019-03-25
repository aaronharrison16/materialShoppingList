import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatSnackBarModule, MatDialogModule } from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { NavComponent } from './nav/nav.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DialogDeleteComponent } from './shopping-list/dialog-delete/dialog-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    ShoppingCartComponent,
    MyListsComponent,
    NavComponent,
    DialogDeleteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [
    DialogDeleteComponent
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
