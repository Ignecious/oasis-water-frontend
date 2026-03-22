'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SideDrawer from './SideDrawer';

export default function Header() {
  const { getCartItemCount } = useCart();
  const count = getCartItemCount();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="w-8 h-8 rounded-full bg-oasis-cyan inline-block" />
            <span className="text-xl font-bold text-oasis-navy">Oasis Water</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-oasis-navy">
            <Link href="/" className="hover:text-oasis-cyan transition-colors">Home</Link>
            <Link href="/products" className="hover:text-oasis-cyan transition-colors">Products</Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for product..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-oasis-light-gray text-sm focus:outline-none focus:border-oasis-cyan focus:ring-1 focus:ring-oasis-cyan transition-colors"
              />
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Search Icon - Mobile */}
            <button className="md:hidden text-oasis-navy" aria-label="Search">
              <Search size={22} />
            </button>

            {/* Cart */}
            <Link href="/cart" className="relative text-oasis-navy hover:text-oasis-cyan transition-colors">
              <ShoppingCart size={22} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-oasis-cyan text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* User / Account Icon */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="text-oasis-navy hover:text-oasis-cyan transition-colors"
              aria-label="Account menu"
            >
              <User size={22} />
            </button>
          </div>
        </div>
      </header>

      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
