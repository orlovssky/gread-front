export interface LinkModel {
  id: number;
  title: string;
  author: string;
  image: string;
  content: string;
  url: string;
}
export interface LinkResponseDataModel {
  data: LinkModel;
}
export interface LinksResponseDataModel {
  data: LinkModel[];
}
export interface LinksStateModel {
  links: LinkModel[];
}
