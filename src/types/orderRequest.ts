import { CartItem } from './cart';
import { UserInfo } from './user';
import { Address } from './address';

export interface OrderRequest {
  cart: CartItem[];
  user: UserInfo;
  shipping: Address;
  billing?: Address;
}