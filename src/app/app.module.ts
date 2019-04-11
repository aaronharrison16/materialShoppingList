import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatSnackBarModule, MatDialogModule } from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyListsComponent } from './my-lists/my-lists.component';
import { NavComponent } from './nav/nav.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DialogDeleteComponent } from './shopping-list/dialog-delete/dialog-delete.component';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { ClearDialogComponent } from './clear-dialog/clear-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingCartComponent,
    MyListsComponent,
    NavComponent,
    DialogDeleteComponent,
    ClearDialogComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
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
    MatDialogModule,
  ],
  entryComponents: [
    DialogDeleteComponent,
    ClearDialogComponent
  ],
  providers: [ShoppingListService, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
