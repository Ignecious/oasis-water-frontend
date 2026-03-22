'use client';

import { useOrders } from '@/context/OrderContext';

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

export default function CollectionSchedulePage() {
  const { getAllOrders } = useOrders();
  const orders = getAllOrders().filter((o) => o.fulfillmentType === 'collection' && o.status !== 'cancelled');

  // Group by date
  const byDate: Record<string, typeof orders> = {};
  orders.forEach((o) => {
    const dateKey = new Date(o.collectionDetails.date).toLocaleDateString('en-ZW', {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    });
    if (!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push(o);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-oasis-navy mb-6">Collection Schedule</h1>
      <div className="mb-4 p-3 bg-oasis-cyan/10 rounded-lg text-sm text-oasis-navy font-medium">
        📍 Collection Point: 181 Selous Avenue, Harare, Zimbabwe
      </div>
      {Object.entries(byDate).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center text-gray-400">
          No collections scheduled.
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(byDate).map(([date, dayOrders]) => (
            <div key={date} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-oasis-navy text-white px-6 py-3 font-semibold">{date}</div>
              <div className="divide-y divide-gray-50">
                {TIME_SLOTS.map((slot) => {
                  const slotOrders = dayOrders.filter((o) => o.collectionDetails.timeSlot === slot);
                  if (slotOrders.length === 0) return null;
                  return (
                    <div key={slot} className="px-6 py-4">
                      <h3 className="text-sm font-semibold text-oasis-navy mb-2">⏰ {slot}</h3>
                      <div className="space-y-2">
                        {slotOrders.map((o) => (
                          <div key={o.orderNumber} className="flex justify-between text-sm bg-gray-50 rounded-lg px-4 py-2">
                            <div>
                              <span className="font-medium text-oasis-navy">{o.orderNumber}</span>
                              <span className="text-gray-500 ml-2">— {o.customer.firstName} {o.customer.lastName}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold text-oasis-navy">${o.total.toFixed(2)}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                                o.status === 'ready' ? 'bg-green-100 text-green-700' :
                                o.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>{o.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
