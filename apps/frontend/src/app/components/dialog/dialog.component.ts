import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'happy-coding-challenge-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  dialogForm: FormGroup;

  constructor(private _dialog: MatDialog, private _formBuilder: FormBuilder) {
    this.dialogForm = this._formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      dateOfBirth: '',
    });
  }

  closeDialog() {
    this._dialog.closeAll();
  }

  onFormSubmit() {
    if (this.dialogForm.valid) {
      console.log(this.dialogForm.value);
    }
  }
}
