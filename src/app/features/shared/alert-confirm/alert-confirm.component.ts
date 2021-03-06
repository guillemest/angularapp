import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Models
import { UserModel } from '../../models/user.model';

@Component({
  templateUrl: './alert-confirm.component.html',
  styleUrls: ['./alert-confirm.component.scss'],
})
export class AlertConfirmComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<AlertConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
