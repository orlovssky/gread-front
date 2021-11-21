import { SignUpUserModel, SignInUserModel, AuthResponseDataModel } from 'models/auth';
import { api, endpoints } from 'plugins/axios';

export async function signUpUserApi(user: SignUpUserModel): Promise<AuthResponseDataModel> {
  return await api.post(`${endpoints.auth}/signup`, user);
}
export async function signInUserApi(user: SignInUserModel): Promise<AuthResponseDataModel> {
  return await api.post(`${endpoints.auth}/signin`, user);
}
