import { UserResponseDataModel, UpdateUserModel } from 'models/user';
import { api, endpoints } from 'plugins/axios';

export async function getUser(): Promise<UserResponseDataModel> {
  return await api.get(`${endpoints.user}`);
}
export async function updateUser(user: UpdateUserModel, id: number): Promise<{ data: string }> {
  return await api.put(`${endpoints.user}/${id}`, user);
}
export async function updatePassword(password: string, id: number): Promise<{ data: string }> {
  return await api.put(`${endpoints.user}/password/${id}`, { password });
}
