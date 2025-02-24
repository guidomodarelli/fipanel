import type { HttpService, OptionsRequest } from '../domain/HttpService';

export class FetchHttpService implements HttpService {
  private async makeRequest<T>(url: string, options?: OptionsRequest): Promise<T> {
    const response = await fetch(url, options);
    if (options?.raw) {
      return response.text() as unknown as T;
    }
    return response.json();
  }

  private createJsonRequestOptions(method: string, data?: unknown): OptionsRequest {
    return {
      method,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      raw: false,
    };
  }

  async get<T>(url: string, options?: OptionsRequest): Promise<T> {
    return this.makeRequest<T>(url, options);
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
