'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import CartItemRow from '@/components/CartItemRow';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, getCartTotal } = useCart();
  const total = getCartTotal();
  const MIN_ORDER = 50;
  const canCheckout = total >= MIN_ORDER;

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <main className="flex-1">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add some products to get started."
            ctaLabel="Browse Products"
            ctaHref="/products"
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-oasis-navy mb-6">Your Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
            {items.map((item) => (
              <CartItemRow key={item.product.id} item={item} />
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
            <h2 className="font-semibold text-oasis-navy mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-oasis-navy text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {!canCheckout && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                Minimum order is ${MIN_ORDER}. Add ${(MIN_ORDER - total).toFixed(2)} more to checkout.
              </div>
            )}
            <Link
              href="/checkout"
              className={`mt-4 block text-center py-3 rounded-lg font-semibold transition-colors ${
                canCheckout
                  ? 'bg-oasis-cyan text-oasis-navy hover:bg-oasis-cyan/90'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
              }`}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
