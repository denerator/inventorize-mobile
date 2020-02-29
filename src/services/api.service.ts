import axios, { Method, AxiosRequestConfig } from 'axios';
import { tokenService } from './token.service';

export abstract class ApiService {
  apiInstance = axios.create({
    baseURL: 'http://localhost:3000',
  });

  protected post = (url: string, body: {}) => {
    return this.request(url, 'POST', body);
  };

  protected put = (url: string, body: {}) => {
    return this.request(url, 'PUT', body);
  };

  protected get = <T>(url: string): Promise<T> => {
    return this.request<T>(url, 'GET');
  };

  private request = <T>(url: string, method: Method, body?: {}): Promise<T> => {
    const config: AxiosRequestConfig = {
      url,
      method,
    };

    if (body) {
      config.data = Object.assign({}, body);
    }

    this.apiInstance.interceptors.request.use((config) => {
      if (!tokenService.token) {
        return config;
      }

      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${tokenService.token}`,
        },
      };
      return config;
    });

    return this.apiInstance.request(config);
  };
}
