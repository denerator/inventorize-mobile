import { ApiService } from './api.service';

export interface ILoginDto {
  email: string;
  password: string;
}

class AuthService extends ApiService {
  public async login(loginDto: ILoginDto) {
    // return await this.post('user/sign-in', loginDto);
  }
}

export const authService = new AuthService();
