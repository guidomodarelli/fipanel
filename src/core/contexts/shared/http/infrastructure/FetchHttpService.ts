import type { HttpService } from '../domain/HttpService';

export class FetchHttpService implements HttpService {
  private async makeRequest<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    return response.json();
  }

  private createJsonRequestOptions(method: string, data?: unknown): RequestInit {
    return {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async get<T>(url: string): Promise<T> {
    return this.makeRequest<T>(url);
  }

  async post<T, D>(url: string, data: D): Promise<T> {
    return this.makeRequest<T>(url, this.createJsonRequestOptions('POST', data));
  }

  async put<T, D>(url: string, data: D): Promise<T> {
    return this.makeRequest<T>(url, this.createJsonRequestOptions('PUT', data));
  }

  async patch<T, D>(url: string, data: D): Promise<T> {
    return this.makeRequest<T>(url, this.createJsonRequestOptions('PATCH', data));
  }

  async delete<T>(url: string): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE' });
  }
}
