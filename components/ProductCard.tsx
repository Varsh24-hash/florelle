
import React from 'react';
import { Product } from '../types';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden group hover:shadow-2xl hover:shadow-rose-100 transition-all duration-500 border border-pink-50 relative">
      <div className="relative h-72 w-full overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className="absolute top-5 left-5 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-md shadow-sm hover:scale-110 active:scale-90 transition-all border border-pink-50 group/fav"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${product.isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-400 group-hover/fav:text-rose-300'}`} 
          />
        </button>

        <div className="absolute top-5 right-5 flex flex-col gap-2">
           {product.isHandmade && (
            <span className="bg-white/90 text-rose-500 text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
              Handmade
            </span>
          )}
          <span className="bg-rose-400/90 text-white text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm backdrop-blur-sm">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-3 text-slate-800 group-hover:text-rose-500 transition-colors">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-serif font-bold text-slate-800">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-rose-50 hover:bg-rose-400 hover:text-white text-rose-500 px-6 py-2.5 rounded-full text-sm font-bold transition-all border border-rose-100"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
};
