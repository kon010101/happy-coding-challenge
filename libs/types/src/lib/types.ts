export interface User {
  id: string;
  email: string;
  password?: string;
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
}

export interface LoginResult {
  user: User;
  access_token: string;
}
