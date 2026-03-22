'use client';

import { Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/context/CartContext';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { increaseQuantity, decreaseQuantity, removeFromCart, validateMinimumQuantity } = useCart();
  const validation = validateMinimumQuantity(item.product, item.quantity);

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100">
      <div className="w-16 h-16 bg-oasis-cyan/20 rounded-lg flex items-center justify-center text-xl font-bold text-oasis-navy shrink-0">
        {item.product.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-oasis-navy text-sm">{item.product.name}</h3>
        <p className="text-xs text-gray-500">{item.product.size}</p>
        <p className="text-sm font-medium text-gray-700 mt-1">${item.product.price.toFixed(2)} each</p>
        {!validation.isValid && (
          <p className="text-xs text-red-500 mt-1">{validation.message}</p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decreaseQuantity(item.product.id)}
            className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50"
          >
            <Minus size={12} />
          </button>
          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
          <button
            onClick={() => increaseQuantity(item.product.id)}
            className="w-7 h-7 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50"
          >
            <Plus size={12} />
          </button>
        </div>
        <div className="text-sm font-bold text-oasis-navy">
          ${(item.product.price * item.quantity).toFixed(2)}
        </div>
        <button
          onClick={() => removeFromCart(item.product.id)}
          className="text-red-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
