import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'happy-coding-challenge-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  dialogForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private usersService: UsersService,
    private _formBuilder: FormBuilder
  ) {
    this.dialogForm = this._formBuilder.group({
      email: '',
      password: '',
    });
  }

  onFormSubmit() {
    if (this.dialogForm.valid) {
      this.authService.login(this.dialogForm.value).subscribe();
    }
  }
}
