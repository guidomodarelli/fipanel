export interface HttpService {
  get<T = any>(url: string): Promise<T>;
  post<T = any, D = any>(url: string, data: D): Promise<T>;
  put<T = any, D = any>(url: string, data: D): Promise<T>;
  patch<T = any, D = any>(url: string, data: D): Promise<T>;
  delete<T = any>(url: string): Promise<T>;
}
