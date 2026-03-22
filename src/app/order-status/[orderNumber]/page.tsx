'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import StatusBadge from '@/components/StatusBadge';
import { useOrders } from '@/context/OrderContext';
import { OrderStatus } from '@/types';
import { ArrowLeft, CheckCircle, Clock } from 'lucide-react';

const TIMELINE: OrderStatus[] = ['pending', 'confirmed', 'ready', 'completed'];

export default function OrderDetailPage() {
  const params = useParams();
  const orderNumber = decodeURIComponent(params.orderNumber as string);
  const { getOrderByNumber } = useOrders();
  const order = getOrderByNumber(orderNumber);

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-oasis-navy mb-2">Order Not Found</h1>
          <p className="text-gray-500 mb-6">We couldn&apos;t find order <strong>{orderNumber}</strong></p>
          <Link href="/order-status" className="bg-oasis-cyan text-oasis-navy font-semibold px-6 py-3 rounded-lg">
            Try Again
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const currentStep = order.status === 'cancelled' ? -1 : TIMELINE.indexOf(order.status);

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <Link href="/order-status" className="flex items-center gap-1 text-sm text-gray-500 hover:text-oasis-navy mb-6">
          <ArrowLeft size={16} /> Back to search
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-xl font-bold text-oasis-navy">{order.orderNumber}</h1>
              <p className="text-sm text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>

          {/* Timeline */}
          {order.status !== 'cancelled' && (
            <div className="flex items-center mb-6">
              {TIMELINE.map((s, i) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    i <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    {i <= currentStep
                      ? <CheckCircle size={18} className="text-white" />
                      : <Clock size={18} className="text-gray-400" />
                    }
                  </div>
                  <span className={`ml-1 text-xs capitalize hidden sm:block ${i <= currentStep ? 'text-green-600 font-medium' : 'text-gray-400'}`}>{s}</span>
                  {i < TIMELINE.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 ${i < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">Customer</p>
              <p className="font-medium">{order.customer.firstName} {order.customer.lastName}</p>
              <p className="text-gray-500">{order.customer.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Fulfillment</p>
              <p className="font-medium capitalize">{order.fulfillmentType}</p>
              {order.fulfillmentType === 'collection' && (
                <p className="text-gray-500 text-xs">{order.collectionDetails.timeSlot}</p>
              )}
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">Payment</p>
              <p className="font-medium capitalize">{order.paymentMethod}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>{order.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="font-semibold text-oasis-navy mb-4">Order Items</h2>
          {order.items.map((item) => (
            <div key={item.product.id} className="flex justify-between py-2 border-b border-gray-50 text-sm">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-gray-400">{item.product.size} × {item.quantity}</p>
              </div>
              <p className="font-semibold text-oasis-navy">${(item.product.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between pt-4 font-bold text-oasis-navy">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
