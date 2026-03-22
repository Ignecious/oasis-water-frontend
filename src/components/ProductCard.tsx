'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

const categoryColors: Record<string, string> = {
  water: 'bg-blue-100 text-blue-700',
  ice: 'bg-cyan-100 text-cyan-700',
  dispensers: 'bg-indigo-100 text-indigo-700',
  accessories: 'bg-purple-100 text-purple-700',
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, validateMinimumQuantity } = useCart();
  const [qty, setQty] = useState(product.minOrderQty || 1);
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const validation = validateMinimumQuantity(product, qty);
    if (!validation.isValid) {
      setError(validation.message || 'Invalid quantity');
      return;
    }
    addToCart(product, qty);
    setAdded(true);
    setError(null);
    setTimeout(() => setAdded(false), 1500);
  };

  const decrease = () => {
    const next = qty - (product.qtyIncrement || 1);
    setQty(Math.max(product.minOrderQty || 1, next));
  };

  const increase = () => {
    setQty(qty + (product.qtyIncrement || 1));
  };

  const colorClass = categoryColors[product.category] || 'bg-gray-100 text-gray-700';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Image placeholder */}
      <div className={`h-40 flex items-center justify-center ${colorClass} text-5xl font-bold`}>
        {product.name.charAt(0)}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit mb-2 ${colorClass}`}>
          {product.category}
        </span>
        <h3 className="font-semibold text-oasis-navy text-sm mb-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-1">{product.size}</p>
        <p className="text-xs text-gray-400 mb-3 flex-1 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-oasis-navy">${product.price.toFixed(2)}</span>
          {product.minOrderQty && (
            <span className="text-xs text-gray-400">MOQ: {product.minOrderQty}</span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <button onClick={decrease} className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
            <Minus size={14} />
          </button>
          <span className="w-8 text-center text-sm font-medium">{qty}</span>
          <button onClick={increase} className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50">
            <Plus size={14} />
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleAdd}
          className={`w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-oasis-cyan text-oasis-navy hover:bg-oasis-cyan/90'
          }`}
        >
          <ShoppingCart size={16} />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
