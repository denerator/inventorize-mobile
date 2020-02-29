import { ApiService } from '../../services/api.service';
import { IInventoryItem } from '../../typings/inventory';

class UserService extends ApiService {
  public async getItemInfo(code: string) {
    return await this.get<IInventoryItem>(`inventory/${code}`);
  }
}

export const userService = new UserService();
