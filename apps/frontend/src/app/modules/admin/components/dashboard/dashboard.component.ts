import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../services/auth.service';

@Component({
  selector: 'happy-coding-challenge-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(private _authenticationService: AuthenticationService) {}

  logout() {
    this._authenticationService.logout();
  }
}
