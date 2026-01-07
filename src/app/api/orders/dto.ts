// src/app/api/orders/dto.ts 

export type OrderItemCreatePayload = {
  productId: string;
  name: string;
  price: number | string;
  quantity: number;
  imageUrl?: string;
};

export type OrderCreatePayload = {
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED' | 'COMPLETED';
  total: number | string;
  shippingId: string;
  billingId: string;
  items: OrderItemCreatePayload[];
};

export type OrderItemResponse = {
  id: string;
  productId?: string | null;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
};

export type OrderResponse = {
  id: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED' | 'COMPLETED';
  total: number;
  shippingId: string;
  billingId?: string | null;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
};