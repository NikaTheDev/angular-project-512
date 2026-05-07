export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface ISignUpData {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE',
}
