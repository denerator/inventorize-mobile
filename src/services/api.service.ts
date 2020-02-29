import axios, { Method, AxiosRequestConfig } from 'axios';
import { tokenService } from './token.service';

interface IApiResponse<T> {
  data: T;
}

export abstract class ApiService {
  private apiInstance = axios.create({
    baseURL: 'https://inventorize.herokuapp.com',
  });

  protected post = <T>(url: string, body: {}) => {
    return this.request<T>(url, 'POST', body);
  };

  protected put = <T>(url: string, body: {}) => {
    return this.request<T>(url, 'PUT', body);
  };

  protected get = <T>(url: string) => {
    return this.request<T>(url, 'GET');
  };

  private request = <T>(
    url: string,
    method: Method,
    body?: {}
  ): Promise<IApiResponse<T>> => {
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
