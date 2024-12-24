export interface IToken {
  accessToken: string;
  refreshToken: string;
}

export enum IRole {
  "USER",
  "ADMIN",
}

export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignUpRequest {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface IAuthResponse {
  status: string;
  token: IToken;
  data: {
    user: IUser;
  };
}
