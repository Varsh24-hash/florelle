
import React, { useState } from 'react';
import { INITIAL_PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { ProductCard } from './components/ProductCard';
import { ProductForm } from './components/ProductForm';
import { AIAssistant } from './components/AIAssistant';
import { ShoppingCart, Plus, Factory, Flower, Menu, X, Trash2, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Industrial' | 'Handmade' | 'Favorites'>('All');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const filteredProducts = products.filter(p => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Favorites') return p.isFavorite;
    return p.category === activeFilter;
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col pastel-bg-gradient">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-pink-100">
        <div className="flex items-center gap-2">
          <Heart className="text-pink-400 fill-pink-100" size={28} />
          <h1 className="text-2xl font-bold tracking-tighter text-slate-800 uppercase">
            FLOR<span className="text-rose-400">ELLE</span>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-slate-500">
          <a href="#" className="hover:text-rose-400 transition-colors">The Garden</a>
          <a href="#" className="hover:text-rose-400 transition-colors">Our Forge</a>
          <a href="#" className="hover:text-rose-400 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsAddFormOpen(true)}
            className="flex items-center gap-2 bg-pink-50 hover:bg-pink-100 text-rose-500 px-4 py-2 rounded-full border border-rose-200 text-sm font-bold transition-all"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Add Yours</span>
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-600 hover:text-rose-400 transition-colors"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block text-rose-400 text-xs font-bold uppercase tracking-[0.4em] mb-4">Softness forged in strength</span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6 text-slate-800 leading-tight">
            Soft Petals for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500 italic">Sweet Souls</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg">
            Where industrial craftsmanship meets pastel dreams at Florelle. Every bouquet is a whisper of steel and a song of silk. Handcrafted for the delicate at heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveFilter('All')}
              className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg pastel-glow"
            >
              Explore Blooms
            </button>
            <button className="glass hover:bg-white/80 px-8 py-4 rounded-full font-bold text-lg transition-all text-rose-500 border-rose-200">
              Custom Requests
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-6 py-16 flex-1 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <Flower className="text-rose-400" /> 
              {activeFilter === 'Favorites' ? 'Your Favorites' : 'Seasonal Harvest'}
            </h2>
            <p className="text-slate-500 mt-2">
              {activeFilter === 'Favorites' 
                ? 'Your handpicked selection of artisanal blooms.' 
                : 'Delicate designs for your home or workspace.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Industrial', 'Handmade', 'Favorites'] as const).map(cat => (
              <button 
                key={cat} 
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all shadow-sm flex items-center gap-2 ${
                  activeFilter === cat 
                  ? 'border-rose-400 bg-rose-400 text-white shadow-rose-100' 
                  : 'border-pink-100 bg-white text-slate-400 hover:border-rose-200 hover:text-rose-400'
                }`}
              >
                {cat === 'Favorites' && <Heart size={14} className={activeFilter === 'Favorites' ? 'fill-white' : ''} />}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.map(p => (
              <ProductCard 
                key={p.id} 
                product={p} 
                onAddToCart={addToCart} 
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/30 rounded-[3rem] border border-dashed border-pink-200">
             <Heart size={48} className="mx-auto text-pink-100 mb-4" />
             <p className="text-slate-400 italic">No products found in this category.</p>
             {activeFilter === 'Favorites' && (
               <button 
                 onClick={() => setActiveFilter('All')}
                 className="mt-4 text-rose-400 font-bold hover:underline"
               >
                 Go find some favorites!
               </button>
             )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-pink-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Heart className="text-rose-400 fill-rose-50" size={32} />
              <h1 className="text-3xl font-bold tracking-tighter text-slate-800 uppercase">
                FLOR<span className="text-rose-400">ELLE</span>
              </h1>
            </div>
            <p className="text-slate-500 max-w-md">
              Bringing a touch of pastel beauty to industrial hearts. Florelle celebrates the duality of tough pipelines and tender petals.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Customer Care</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Delivery Options</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Gift Wrapping</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Care Guide</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6 uppercase tracking-widest text-xs">Social</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><a href="#" className="hover:text-rose-400 transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Pinterest</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">TikTok</a></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isAddFormOpen && (
        <ProductForm 
          onAdd={p => setProducts([p, ...products])} 
          onClose={() => setIsAddFormOpen(false)} 
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md glass h-full flex flex-col shadow-2xl animate-slide-in-right">
            <div className="p-6 border-b border-pink-100 flex justify-between items-center bg-white/50">
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                <ShoppingCart className="text-rose-400" /> My Basket
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <Flower size={48} className="mx-auto text-pink-100 mb-4" />
                  <p className="text-slate-400 italic">Your basket is waiting for blooms.</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/50 p-4 rounded-2xl border border-pink-50">
                    <img src={item.image} className="w-20 h-20 object-cover rounded-xl" alt="" />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{item.name}</h4>
                      <p className="text-slate-500 text-xs">Qty: {item.quantity}</p>
                      <p className="text-rose-400 font-serif font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-pink-200 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-white/80 border-t border-pink-100">
              <div className="flex justify-between text-xl font-bold mb-6 text-slate-800">
                <span>Total</span>
                <span className="text-rose-400">${total.toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-rose-400 hover:bg-rose-500 disabled:bg-slate-200 disabled:cursor-not-allowed text-white py-4 rounded-full font-bold transition-all shadow-lg text-lg uppercase tracking-widest"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating AI */}
      <AIAssistant />
    </div>
  );
};

export default App;
