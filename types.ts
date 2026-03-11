
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Industrial' | 'Natural' | 'Handmade';
  isHandmade: boolean;
  isFavorite?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
