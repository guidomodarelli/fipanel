import type { HttpService } from '../domain/HttpService';

export class FetchHttpService implements HttpService {
  async get(url: string): Promise<any> {
    const response = await fetch(url);
    return response.json();
  }

  async post(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async put(url: string, data: any): Promise<any> {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.json();
  }

  async delete(url: string): Promise<any> {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    return response.json();
  }
}
