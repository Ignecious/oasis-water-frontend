'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getCartItemCount } = useCart();
  const count = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 bg-oasis-navy shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-oasis-cyan">oasis</span>
          <span className="text-white"> water</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-white text-sm">
          <Link href="/products" className="hover:text-oasis-cyan transition-colors">Products</Link>
          <Link href="/order-status" className="hover:text-oasis-cyan transition-colors">Order Status</Link>
          <Link href="/admin/dashboard" className="hover:text-oasis-cyan transition-colors">Admin</Link>
          <Link href="/cart" className="relative flex items-center gap-1 hover:text-oasis-cyan transition-colors">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-oasis-cyan text-oasis-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </nav>
        <div className="md:hidden flex items-center gap-4 text-white">
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-oasis-cyan text-oasis-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
