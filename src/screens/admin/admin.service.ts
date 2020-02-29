import { ApiService } from '../../services/api.service';
import { IInventoryItem } from '../../typings/inventory';

class AdminService extends ApiService {
  public async getAllItems() {
    return await this.get<IInventoryItem[]>('inventory');
  }

  public async updateItem(item: IInventoryItem) {
    return await this.put<IInventoryItem>('inventory', item);
  }

  public async createItem(item: IInventoryItem) {
    return await this.post<IInventoryItem>('inventory', item);
  }
}

export const adminService = new AdminService();
