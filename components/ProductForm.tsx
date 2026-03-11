
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductFormProps {
  onAdd: (product: Product) => void;
  onClose: () => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=800&auto=format&fit=crop',
    category: 'Handmade' as Product['category'],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      image: formData.image,
      category: formData.category,
      isHandmade: true,
    };
    onAdd(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-lg p-10 rounded-[2.5rem] shadow-2xl border border-pink-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-200 via-pink-300 to-sky-200"></div>
        <h2 className="text-3xl font-bold mb-8 text-slate-800">Add to the Garden</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bouquet Name</label>
            <input 
              required
              className="w-full bg-slate-50 border border-pink-100 rounded-2xl px-5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. Lavender Steel Mist"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Description</label>
            <textarea 
              required
              className="w-full bg-slate-50 border border-pink-100 rounded-2xl px-5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 h-32 transition-all"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your creation..."
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Price ($)</label>
              <input 
                required
                type="number"
                step="0.01"
                className="w-full bg-slate-50 border border-pink-100 rounded-2xl px-5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Category</label>
              <select 
                className="w-full bg-slate-50 border border-pink-100 rounded-2xl px-5 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-200 transition-all"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as Product['category']})}
              >
                <option value="Handmade">Handmade</option>
                <option value="Industrial">Industrial</option>
                <option value="Natural">Natural</option>
              </select>
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-50 transition-colors"
            >
              Close
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-4 bg-rose-400 hover:bg-rose-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-rose-100"
            >
              Post Artwork
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
