import { Url } from "@/types/url.type";
import { api } from "./api";

export class UrlService {
  static async getUrlDetail(id: string): Promise<Url> {
    const res = await api.get(`/url/${id}`);
    return res.data;
  }
}
