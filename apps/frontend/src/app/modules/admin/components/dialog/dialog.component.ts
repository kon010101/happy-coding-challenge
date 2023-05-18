import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '@happy-coding-challenge/types';
import { UsersService } from '../../../../services/users.service';
import { CoreService } from '../../../../core/core.service';

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
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public userData: User
  ) {
    this.dialogForm = this._formBuilder.group({
      firstname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      dateOfBirth: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.dialogForm.patchValue(this.userData);
  }

  public onFormSubmit() {
    if (this.userData) {
      this._usersService
        .updateUser(this.userData.id, this.dialogForm.value)
        .subscribe({
          next: () => {
            this._coreService.openSnackBar('User updated');
            this._dialogRef.close(true);
          },
          error: (err: Partial<User>) => {
            console.log(err);
          },
        });
    } else {
      if (this.dialogForm.valid) {
        this._usersService.createUser(this.dialogForm.value).subscribe({
          next: () => {
            this._coreService.openSnackBar('User added');
            this._dialogRef.close(true);
          },
          error: (err: Partial<User>) => {
            console.log(err);
          },
        });
      }
    }
  }

  public throwFormError(controlName: string, errorName: string) {
    return this.dialogForm.controls[controlName].hasError(errorName);
  }
}
