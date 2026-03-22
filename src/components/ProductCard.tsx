'use client';

import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

const categoryBgColors: Record<string, string> = {
  water: 'bg-gradient-to-br from-sky-100 to-sky-200',
  ice: 'bg-gradient-to-br from-slate-800 to-slate-900',
  dispensers: 'bg-gradient-to-br from-blue-50 to-blue-100',
  accessories: 'bg-gradient-to-br from-purple-50 to-purple-100',
};

const categoryTextColors: Record<string, string> = {
  water: 'text-sky-400',
  ice: 'text-white',
  dispensers: 'text-blue-400',
  accessories: 'text-purple-400',
};

interface ProductCardProps {
  product: Product;
  badge?: 'POPULAR' | 'BEST VALUE' | null;
}

export default function ProductCard({ product, badge }: ProductCardProps) {
  const { addToCart, validateMinimumQuantity } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const qty = product.minOrderQty || 1;
    const validation = validateMinimumQuantity(product, qty);
    if (!validation.isValid) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const bgClass = categoryBgColors[product.category] || 'bg-gray-100';
  const textClass = categoryTextColors[product.category] || 'text-gray-400';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow flex flex-col relative">
      {/* Badge */}
      {badge && (
        <span className="absolute top-3 right-3 z-10 bg-oasis-cyan text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
          {badge}
        </span>
      )}

      {/* Image placeholder */}
      <div className={`h-48 flex items-center justify-center ${bgClass} relative`}>
        <span className={`text-7xl font-bold ${textClass} opacity-50`}>
          {product.name.charAt(0)}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* Name & Price Row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-oasis-navy text-sm leading-tight">{product.name}</h3>
          <span className="text-base font-bold text-oasis-cyan whitespace-nowrap">${product.price.toFixed(2)}</span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-400 mb-4 flex-1 line-clamp-2">
          {product.size} - {product.description}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAdd}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
            added
              ? 'bg-green-500 text-white'
              : 'bg-oasis-navy text-white hover:bg-oasis-navy/90'
          }`}
        >
          <ShoppingCart size={16} />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
