import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

export interface DialogData {
  role: string;
}

@Component({
  selector: 'app-user-facade',
  templateUrl: './user-facade.component.html',
  styleUrls: ['./user-facade.component.css']
})
export class UserFacadeComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserFacadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

  ngOnInit(): void {
    console.log(this.data);
  }

}
