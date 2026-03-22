'use client';

import { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import StatusBadge from '@/components/StatusBadge';
import { OrderStatus } from '@/types';

const statusTabs: { value: 'all' | OrderStatus; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'ready', label: 'Ready' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

const nextStatuses: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['ready', 'cancelled'],
  ready: ['completed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export default function AdminOrdersPage() {
  const { getAllOrders, updateOrderStatus } = useOrders();
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const all = getAllOrders();
  const filtered = activeTab === 'all' ? all : all.filter((o) => o.status === activeTab);

  return (
    <div>
      <h1 className="text-2xl font-bold text-oasis-navy mb-6">Orders</h1>

      {/* Status Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statusTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'bg-oasis-navy text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-oasis-navy'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Order</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Customer</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Total</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Payment</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr key={order.orderNumber} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium text-oasis-navy">{order.orderNumber}</td>
                <td className="py-3 px-4">{order.customer.firstName} {order.customer.lastName}</td>
                <td className="py-3 px-4 font-semibold">${order.total.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span className="capitalize text-xs">{order.paymentMethod}</span>
                  <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>{order.paymentStatus}</span>
                </td>
                <td className="py-3 px-4"><StatusBadge status={order.status} /></td>
                <td className="py-3 px-4">
                  {nextStatuses[order.status].length > 0 && (
                    <div className="flex gap-1">
                      {nextStatuses[order.status].map((ns) => (
                        <button
                          key={ns}
                          onClick={() => updateOrderStatus(order.orderNumber, ns)}
                          className={`text-xs px-2 py-1 rounded font-medium ${
                            ns === 'cancelled'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-oasis-cyan/20 text-oasis-navy hover:bg-oasis-cyan/40'
                          }`}
                        >
                          {ns}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
