import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
