import { TestBed } from '@angular/core/testing';

import { CoreService } from './core.service';
import { AppModule } from '../app.module';

describe('CoreService', () => {
  let service: CoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(CoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
