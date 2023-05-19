import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUser1, mockUserArray } from './mocks/users.mock';
import { User } from '@happy-coding-challenge/types';

describe('UsersService', () => {
  let service: UsersService;
  let httpController: HttpTestingController;
  const url = 'http://localhost:3000/api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    service = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getUsers and return an array of Users', () => {
    service.getUsers().subscribe((res) => {
      expect(res).toEqual(mockUserArray);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/users`,
    });

    req.flush(mockUserArray);
  });

  it('should call getUser and return the appropriate User', () => {
    const id = '3fa85f64-5717-4562-b3fc-2c963f66afa6';

    service.getUser(id).subscribe((data) => {
      expect(data).toEqual(mockUser1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/users/${id}`,
    });

    req.flush(mockUser1);
  });

  it('should call updateUser and return the updated user from the API', () => {
    const updatedUser: User = {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      email: 'firstname@lastname.com',
      firstname: 'Firstname',
      lastname: 'Lastname',
      password: 'password',
    };

    service.updateUser(mockUser1.id, mockUser1).subscribe((data) => {
      expect(data).toEqual(updatedUser);
    });

    const req = httpController.expectOne({
      method: 'PATCH',
      url: `${url}/users/${mockUser1.id}`,
    });

    req.flush(updatedUser);
  });
});
