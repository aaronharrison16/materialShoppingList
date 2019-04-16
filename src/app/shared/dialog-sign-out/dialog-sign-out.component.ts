import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-sign-out',
  templateUrl: './dialog-sign-out.component.html',
  styleUrls: ['./dialog-sign-out.component.css']
})
export class DialogSignOutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogSignOutComponent>
  ) { }

  ngOnInit() {
  }

}
