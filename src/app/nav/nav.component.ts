import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { MatDialog } from '@angular/material';
import { DialogSignOutComponent } from '../shared/dialog-sign-out/dialog-sign-out.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  token: string = null;

  constructor( 
    public authService: AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onSignIn() {
    this.authService.doGoogleLogin()
  }

  onSignOut() {
    const dialogRef = this.dialog.open(DialogSignOutComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.signOut();
      }
    });
    
  }
}