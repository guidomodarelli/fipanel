import type { HttpService } from '@/core/contexts/shared/http/domain/HttpService';
import axios from 'axios';

export class AxiosHttpService implements HttpService {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get(url);
    return response.data as T;
  }

  async post<T = unknown, D = unknown>(url: string, data: D): Promise<T> {
    const response = await axios.post(url, data);
    return response.data as T;
  }

  async put<T = unknown, D = unknown>(url: string, data: D): Promise<T> {
    const response = await axios.put(url, data);
    return response.data as T;
  }

  async patch<T = unknown, D = unknown>(url: string, data: D): Promise<T> {
    const response = await axios.patch(url, data);
    return response.data as T;
  }

  async delete<T = unknown>(url: string): Promise<T> {
    const response = await axios.delete(url);
    return response.data as T;
  }
}
