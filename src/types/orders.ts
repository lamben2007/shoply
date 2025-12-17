export type OrderItem = {
  id: string;
  quantity: number;
  price: string; // Prisma Decimal → string côté JS
  orderId: string;
  productId: string;
  // ajouter les infos sur "product" si le include est fait !
  // product?: Product;
};

export type Order = {
  id: string;
  fullname: string;
  email: string;
  address: string;
  totalPrice: string; // Prisma Decimal → string côté JS
  createdAt: string;  // ou Date, si transforms avec new Date()
  items: OrderItem[]; // ou (OrderItem & { product?: Product })[] si "product" inclus
};