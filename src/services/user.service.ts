import { storageService } from "./storage.service";

export interface IUser {
  name: string;
  email: string;
  role: 'admin' | 'user';
  access_token: string;
}

class UserService {
  private _user: IUser | undefined;

  public setUser = (user: IUser) => {
    this._user = user;
  };

  public get user() {
    return this._user;
  }

  public async logout() {
    this._user = undefined;
    await storageService.clearUser();
  }
}

export const userService = new UserService();
