import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AddressProvider } from '@/context/AddressContext';
import { OrderProvider } from '@/context/OrderContext';

export const metadata: Metadata = {
  title: 'Oasis Water Zimbabwe',
  description: 'Pure Water, Pure Life — Zimbabwe\'s trusted water delivery service.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <AddressProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </AddressProvider>
        </CartProvider>
      </body>
    </html>
  );
}
