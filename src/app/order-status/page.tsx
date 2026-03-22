'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

export default function OrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderNumber.trim()) {
      router.push(`/order-status/${orderNumber.trim()}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl shadow-md p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-oasis-cyan/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-oasis-cyan" />
          </div>
          <h1 className="text-2xl font-bold text-oasis-navy mb-2">Track Your Order</h1>
          <p className="text-gray-500 mb-6">Enter your order number to check its status</p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. OW-2026-001"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
            />
            <button
              type="submit"
              className="bg-oasis-cyan text-oasis-navy font-semibold px-4 py-2 rounded-lg hover:bg-oasis-cyan/90 transition-colors"
            >
              Track
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
