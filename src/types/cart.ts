export interface CartItem {
  productId: string;     
  name: string;
  slug?: string;         
  price: number;
  imageUrl: string;
  quantity: number;
}