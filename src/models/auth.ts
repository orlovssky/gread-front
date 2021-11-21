export interface SignUpUserModel {
  email: string;
  password: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
}
export interface SignInUserModel {
  email: string;
  password: string;
}
export interface AuthResponseDataModel {
  data: {
    token: string;
  };
}
