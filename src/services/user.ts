import { UserResponseDataModel, UpdateUserModel } from 'models/user';
import { api, endpoints } from 'plugins/axios';

export async function getUserApi(): Promise<UserResponseDataModel> {
  return await api.get(`${endpoints.user}`);
}
export async function updateUserApi(user: UpdateUserModel, id: number): Promise<{ data: string }> {
  return await api.put(`${endpoints.user}/${id}`, user);
}
export async function updatePasswordApi(password: string, id: number): Promise<{ data: string }> {
  return await api.put(`${endpoints.user}/password/${id}`, { password });
}
