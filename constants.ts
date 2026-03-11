
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'The Copper Coil Rose',
    description: 'A striking rose handcrafted from pure industrial copper wire. Never fades, just patinas with time.',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop',
    category: 'Industrial',
    isHandmade: true,
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Steel Pipeline Bouquet',
    description: 'A rugged mix of metal shards and delicate silk lilies, representing the duality of industry.',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1490750916282-74465830cb0b?q=80&w=800&auto=format&fit=crop',
    category: 'Industrial',
    isHandmade: false,
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Midnight Welder’s Choice',
    description: 'Dark-toned natural blooms paired with repurposed welding rod accents.',
    price: 95.00,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800&auto=format&fit=crop',
    category: 'Handmade',
    isHandmade: true,
    isFavorite: false,
  }
];
