import { ApiService } from './api.service';
import { storageService } from './storage.service';
import { tokenService } from './token.service';
import { IUser } from '../services/user.service';

export interface ILoginDto {
  email: string;
  password: string;
}

class AuthService extends ApiService {
  public async login(
    loginDto: ILoginDto,
    successCallback: () => void,
    errorCallback: (message: string) => void
  ) {
    try {
      const resp = await this.post<IUser>('auth/login', loginDto);
      await storageService.saveUser(resp.data);
      tokenService.setToken(resp.data.access_token);
      successCallback();
    } catch (error) {
      errorCallback(error.response.data.message);
    }
  }
}

export const authService = new AuthService();
