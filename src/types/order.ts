import { CartItem } from './cart';
import { UserInfo } from './user';
import { Address } from './address';

export interface Order_old {
  orderId: string;
  user: UserInfo;
  cart: CartItem[];
  shipping: Address;
  billing?: Address; // Optionnel si identique à shipping
  status: 'pending' | 'paid' | 'shipped' | 'cancelled' | 'completed';
  createdAt: string; // ISO date string
  updatedAt?: string;
  total: number;
}


export type Order = {
  id: string;
  userId: string | null;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED' | 'COMPLETED';
  total: string;           // Decimal de Prisma => string en JS/TS
  shippingId: string;
  billingId: string | null;
  createdAt: string;       // DateTime le plus souvent en string (ISO) côté API
  updatedAt: string;
  cart: CartItem[];
  // Relations (à inclure si besoin) :
  shipping?: Address;
  billing?: Address | null;
  // items?: OrderItem[];
};