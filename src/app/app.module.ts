import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatSnackBarModule, MatDialogModule, MatCardModule } from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NavComponent } from './nav/nav.component';
import { DialogDeleteComponent } from './shopping-list/dialog-delete/dialog-delete.component';
import { ClearDialogComponent } from './shared/clear-dialog/clear-dialog.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DialogSignOutComponent } from './shared/dialog-sign-out/dialog-sign-out.component';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { AuthService } from './core/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingCartComponent,
    NavComponent,
    DialogDeleteComponent,
    ClearDialogComponent,
    LandingPageComponent,
    DialogSignOutComponent
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
    MatCardModule
  ],
  entryComponents: [
    DialogDeleteComponent,
    ClearDialogComponent,
    DialogSignOutComponent
  ],
  providers: [ShoppingListService, ShoppingCartService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
