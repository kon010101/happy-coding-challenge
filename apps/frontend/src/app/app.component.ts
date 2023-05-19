import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'happy-coding-challenge-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private _authenticationService: AuthenticationService,
    public router: Router
  ) {}

  logout() {
    this._authenticationService.logout();
  }
}
