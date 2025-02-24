export interface OptionsRequest extends RequestInit {
  raw?: boolean;
}

export interface HttpService {
  get<T = unknown>(url: string, options?: OptionsRequest): Promise<T>;
  post<T = unknown, D = unknown>(url: string, data: D, options?: OptionsRequest): Promise<T>;
  put<T = unknown, D = unknown>(url: string, data: D, options?: OptionsRequest): Promise<T>;
  patch<T = unknown, D = unknown>(url: string, data: D, options?: OptionsRequest): Promise<T>;
  delete<T = unknown>(url: string, options?: OptionsRequest): Promise<T>;
}
