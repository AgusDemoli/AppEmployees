import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent {
  message: string;
  btnConfirm = 'confirm';

  constructor(public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
    ) {
      this.message = data.message;
  }

  ngOnInit(): void {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
