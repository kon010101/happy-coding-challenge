import { User } from '@happy-coding-challenge/types';

const mockUser1: User = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  email: 'firstname@lastname.com',
  firstname: 'Firstname',
  lastname: 'Lastname',
  password: 'password',
  dateOfBirth: new Date(),
};

const mockUser2: User = {
  id: '3fa85f64-1717-4562-b3fc-2c963f66afa6',
  email: 'firstname@lastname.com',
  firstname: 'Firstname2',
  lastname: 'Lastname2',
  password: 'password',
  dateOfBirth: new Date(),
};

const mockUser3: User = {
  id: '3fa85f64-3717-4562-b3fc-2c963f66afa6',
  email: 'firstname@lastname.com',
  firstname: 'Firstname3',
  lastname: 'Lastname3',
  password: 'password',
  dateOfBirth: new Date(),
};

const mockUserArray: User[] = [mockUser1, mockUser2, mockUser3];

export { mockUser1, mockUser2, mockUser3, mockUserArray };
