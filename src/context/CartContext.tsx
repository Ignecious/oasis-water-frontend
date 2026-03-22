'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartValidation {
  isValid: boolean;
  message?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, qty: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getItemQuantity: (productId: string) => number;
  validateMinimumQuantity: (product: Product, qty: number) => CartValidation;
  getNextValidQuantity: (product: Product, currentQty: number, direction: 'up' | 'down') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const validateMinimumQuantity = (product: Product, qty: number): CartValidation => {
    const moq = product.minOrderQty || 1;
    const increment = product.qtyIncrement || 1;
    if (qty < moq) {
      return { isValid: false, message: `Minimum order quantity is ${moq} ${product.unitType || 'units'}` };
    }
    if (increment > 1 && (qty - moq) % increment !== 0) {
      const lower = moq + Math.floor((qty - moq) / increment) * increment;
      const upper = lower + increment;
      return { isValid: false, message: `Must be ordered in multiples of ${increment}. Try ${lower} or ${upper}` };
    }
    return { isValid: true };
  };

  const getNextValidQuantity = (product: Product, currentQty: number, direction: 'up' | 'down'): number => {
    const moq = product.minOrderQty || 1;
    const increment = product.qtyIncrement || 1;
    if (direction === 'up') {
      if (currentQty < moq) return moq;
      return currentQty + increment;
    } else {
      const next = currentQty - increment;
      return next < moq ? 0 : next;
    }
  };

  const addToCart = (product: Product, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { product, quantity: qty }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
    );
  };

  const increaseQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      const next = getNextValidQuantity(item.product, item.quantity, 'up');
      updateQuantity(productId, next);
    }
  };

  const decreaseQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    if (item) {
      const next = getNextValidQuantity(item.product, item.quantity, 'down');
      updateQuantity(productId, next);
    }
  };

  const clearCart = () => setItems([]);

  const getCartTotal = () =>
    items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  const getCartItemCount = () =>
    items.reduce((sum, i) => sum + i.quantity, 0);

  const getItemQuantity = (productId: string) =>
    items.find((i) => i.product.id === productId)?.quantity || 0;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        getItemQuantity,
        validateMinimumQuantity,
        getNextValidQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
