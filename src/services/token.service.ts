class TokenService {
  private _token = '';

  public setToken = (token: string) => {
    this._token = token;
  };

  public get token() {
    return this._token;
  }
}

export const tokenService = new TokenService();
