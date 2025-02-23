export interface HttpService {
  get<T = unknown>(url: string): Promise<T>;
  post<T = unknown, D = unknown>(url: string, data: D): Promise<T>;
  put<T = unknown, D = unknown>(url: string, data: D): Promise<T>;
  patch<T = unknown, D = unknown>(url: string, data: D): Promise<T>;
  delete<T = unknown>(url: string): Promise<T>;
}
