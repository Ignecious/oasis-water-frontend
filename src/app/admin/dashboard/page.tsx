'use client';

import { useOrders } from '@/context/OrderContext';

export default function AdminDashboardPage() {
  const { getAllOrders, getTodaysOrders, getOrdersByStatus } = useOrders();
  const all = getAllOrders();
  const totalRevenue = all.reduce((s, o) => s + o.total, 0);
  const pending = getOrdersByStatus('pending').length;
  const todayCollections = getTodaysOrders().filter(o => o.fulfillmentType === 'collection').length;

  const cards = [
    { label: 'Total Orders', value: all.length, color: 'bg-oasis-navy text-white' },
    { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: 'bg-oasis-cyan text-oasis-navy' },
    { label: 'Pending Orders', value: pending, color: 'bg-yellow-100 text-yellow-700' },
    { label: "Today's Collections", value: todayCollections, color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-oasis-navy mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl p-6 ${card.color} shadow-sm`}>
            <p className="text-sm opacity-70 mb-1">{card.label}</p>
            <p className="text-3xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="font-semibold text-oasis-navy mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Order</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Customer</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Total</th>
                <th className="text-left py-2 pr-4 text-gray-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {all.slice(0, 5).map((order) => (
                <tr key={order.orderNumber} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 pr-4 font-medium text-oasis-navy">{order.orderNumber}</td>
                  <td className="py-2 pr-4">{order.customer.firstName} {order.customer.lastName}</td>
                  <td className="py-2 pr-4 font-semibold">${order.total.toFixed(2)}</td>
                  <td className="py-2 pr-4">
                    <span className="capitalize text-xs px-2 py-1 rounded-full bg-gray-100">{order.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
