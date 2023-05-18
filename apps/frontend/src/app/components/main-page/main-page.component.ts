import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'happy-coding-challenge-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent {
  constructor(private _authenticationService: AuthenticationService) {}

  logout() {
    this._authenticationService.logout();
  }
}
