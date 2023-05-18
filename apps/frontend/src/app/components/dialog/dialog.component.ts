import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@happy-coding-challenge/types';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'happy-coding-challenge-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  dialogForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userData: User
  ) {
    this.dialogForm = this._formBuilder.group({
      firstname: '',
      lastname: '',
      email: '',
      dateOfBirth: '',
      password: '',
    });
  }

  ngOnInit(): void {
    this.dialogForm.patchValue(this.userData);
  }

  onFormSubmit() {
    if (this.userData) {
      this._usersService
        .updateUser(this.userData.id, this.dialogForm.value)
        .subscribe({
          next: (val: Partial<User>) => {
            console.log({ val });
            alert('Updated');
            this._dialogRef.close(true);
          },
          error: (err: Partial<User>) => {
            console.log(err);
          },
        });
    } else {
      if (this.dialogForm.valid) {
        this._usersService.createUser(this.dialogForm.value).subscribe({
          next: (val: Partial<User>) => {
            alert('User added');
            this._dialogRef.close(true);
          },
          error: (err: Partial<User>) => {
            console.log(err);
          },
        });
      }
    }
  }
}
