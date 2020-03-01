export interface IInventoryItem {
  _id?: string;
  name: string;
  price: number;
  amount: number;
  responsible: string;
  code: string;
  createdAt?: string;
}
