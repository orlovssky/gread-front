export interface UserModel {
  id: number;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}
export interface UserResponseDataModel {
  data: UserModel;
}
export interface UpdateUserModel {
  email?: string;
  password?: string;
  username?: string | null;
  firstname?: string | null;
  lastname?: string | null;
}
export interface UpdatePasswordModel {
  id: number;
  password: string;
}
