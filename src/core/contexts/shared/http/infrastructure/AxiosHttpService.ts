import { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import axios from 'axios';

export class AxiosHttpService implements HttpService {
  async get(url: string) {
    const response = await axios.get(url);
    return response.data;
  }

  async post(url: string, data: any): Promise<any> {
    const response = await axios.post(url, data);
    return response.data;
  }

  async put(url: string, data: any): Promise<any> {
    const response = await axios.put(url, data);
    return response.data;
  }

  async delete(url: string): Promise<any> {
    const response = await axios.delete(url);
    return response.data;
  }
}
