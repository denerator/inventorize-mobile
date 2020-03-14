import { ApiService } from './api.service';
import { IInventoryItem } from '../typings/inventory';

class InventoryService extends ApiService {
  public async getAllItems() {
    return await this.get<IInventoryItem[]>('inventory');
  }

  public async updateItem(item: IInventoryItem) {
    return await this.put<IInventoryItem>('inventory', item);
  }

  public async createItem(item: IInventoryItem) {
    return await this.post<IInventoryItem>('inventory', item);
  }

  public async getItemInfo(code: string) {
    return await this.get<IInventoryItem>(`inventory/${code}`);
  }

  public async deleteItem(id: string) {
    return await this.delete<IInventoryItem>(`inventory/${id}`);
  }
}

export const inventoryService = new InventoryService();
