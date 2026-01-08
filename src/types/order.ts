export type OrderItemInput = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

export type CreateOrderPayload = {
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'CANCELLED' | 'COMPLETED';
  total: number;
  shippingId: string;
  billingId: string;
  items: OrderItemInput[];
};

export type OrderResponse = {
  id: string;
  status: string;
  total: number;
  shippingId: string;
  billingId: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemInput[]; 
};