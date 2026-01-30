export interface IUser {
  id: string;
  fullName: string;
  email: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

export interface ISignUpBody {
  fullName: string;
  email: string;
  password: string;
}

export interface ISignInBody {
  email: string;
  password: string;
}

export interface IResponse {
  user: IUser;
  token: string;
}
