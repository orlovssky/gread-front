import { LinkResponseDataModel, LinksResponseDataModel } from 'models/link';
import { api, endpoints } from 'plugins/axios';

export async function postLinkApi(link: string): Promise<LinkResponseDataModel> {
  return await api.post(`${endpoints.link}`, { link });
}
export async function getLinksApi(): Promise<LinksResponseDataModel> {
  return await api.get(`${endpoints.link}`);
}
export async function getLinkApi(id: number): Promise<LinkResponseDataModel> {
  return await api.get(`${endpoints.link}/${id}`);
}
export async function deleteLinkApi(id: number): Promise<{ data: string }> {
  return await api.delete(`${endpoints.link}/${id}`);
}
