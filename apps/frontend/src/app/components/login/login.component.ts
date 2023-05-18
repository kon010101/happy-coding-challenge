import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'happy-coding-challenge-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dialogForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _formBuilder: FormBuilder
  ) {
    this.dialogForm = this._formBuilder.group({
      email: '',
      password: '',
    });
  }

  ngOnInit(): void {
    if (this.authService.userValue) {
      this.router.navigate(['admin']);
    }
  }

  onFormSubmit() {
    if (this.dialogForm.valid) {
      this.authService.login(this.dialogForm.value).subscribe();
    }
  }
}
