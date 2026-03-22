'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TopBar from '@/components/TopBar';
import { useCart } from '@/context/CartContext';
import { useAddress } from '@/context/AddressContext';
import { useOrders } from '@/context/OrderContext';
import { CustomerDetails, PaymentMethod, FulfillmentType, Address, CollectionDetails } from '@/types';
import { CheckCircle, ChevronRight } from 'lucide-react';

const TIME_SLOTS = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
];

const COLLECTION_POINT = '181 Selous Avenue, Harare, Zimbabwe';

const steps = ['Customer Details', 'Fulfillment', 'Payment', 'Review'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  const { addresses, addAddress } = useAddress();
  const { createOrder } = useOrders();

  const [step, setStep] = useState(0);
  const [customer, setCustomer] = useState<CustomerDetails>({ firstName: '', lastName: '', phone: '+263', email: '' });
  const [fulfillmentType, setFulfillmentType] = useState<FulfillmentType>('collection');
  const [collectionDate, setCollectionDate] = useState('');
  const [collectionTimeSlot, setCollectionTimeSlot] = useState('');
  const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(a => a.isDefault)?.id || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [ecocashNumber, setEcocashNumber] = useState('+263');
  const [confirmedOrder, setConfirmedOrder] = useState<{ orderNumber: string } | null>(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', suburb: '', city: '', type: 'home' as 'home' | 'office' | 'other', isDefault: false, label: '' });

  const total = getCartTotal();

  const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleConfirm = () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId);
    const collectionDetails: CollectionDetails = {
      date: collectionDate ? new Date(collectionDate) : new Date(),
      timeSlot: collectionTimeSlot || TIME_SLOTS[0],
      location: COLLECTION_POINT,
    };
    const order = createOrder(
      customer,
      items,
      paymentMethod,
      collectionDetails,
      fulfillmentType,
      fulfillmentType === 'delivery' ? selectedAddress : undefined,
      paymentMethod === 'ecocash' ? ecocashNumber : undefined
    );
    clearCart();
    setConfirmedOrder({ orderNumber: order.orderNumber });
  };

  const handleAddAddress = () => {
    addAddress({ ...newAddress, label: newAddress.label || newAddress.type });
    setShowAddAddress(false);
    setNewAddress({ street: '', suburb: '', city: '', type: 'home', isDefault: false, label: '' });
  };

  if (confirmedOrder) {
    return (
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-md p-10 text-center max-w-md w-full">
            <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-oasis-navy mb-2">Order Confirmed!</h2>
            <p className="text-gray-500 mb-4">Your order number is:</p>
            <div className="bg-oasis-light-gray rounded-lg py-3 px-6 text-2xl font-bold text-oasis-cyan mb-6">
              {confirmedOrder.orderNumber}
            </div>
            <p className="text-sm text-gray-500 mb-6">Keep this number to track your order.</p>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/order-status/${confirmedOrder.orderNumber}`)}
                className="flex-1 bg-oasis-cyan text-oasis-navy font-semibold py-3 rounded-lg hover:bg-oasis-cyan/90"
              >
                Track Order
              </button>
              <button
                onClick={() => router.push('/products')}
                className="flex-1 border-2 border-oasis-navy text-oasis-navy font-semibold py-3 rounded-lg hover:bg-oasis-navy hover:text-white transition-colors"
              >
                Shop More
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-bold text-oasis-navy mb-6">Checkout</h1>

        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                i < step ? 'bg-green-500 text-white' : i === step ? 'bg-oasis-cyan text-oasis-navy' : 'bg-gray-200 text-gray-400'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`ml-2 text-xs hidden sm:block ${i === step ? 'text-oasis-navy font-semibold' : 'text-gray-400'}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Step 0: Customer Details */}
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-oasis-navy text-lg mb-4">Customer Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={customer.firstName}
                    onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                    placeholder="Tendai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={customer.lastName}
                    onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                    placeholder="Moyo"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                  placeholder="+263 77 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                  placeholder="tendai@email.com"
                />
              </div>
            </div>
          )}

          {/* Step 1: Fulfillment */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-oasis-navy text-lg mb-4">Fulfillment</h2>
              <div className="flex gap-3">
                {(['collection', 'delivery'] as FulfillmentType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFulfillmentType(type)}
                    className={`flex-1 py-3 rounded-lg border-2 text-sm font-medium capitalize transition-colors ${
                      fulfillmentType === type
                        ? 'border-oasis-cyan bg-oasis-cyan/5 text-oasis-navy'
                        : 'border-gray-200 text-gray-500'
                    }`}
                  >
                    {type === 'collection' ? '🏪 Collection' : '🚚 Delivery'}
                  </button>
                ))}
              </div>

              {fulfillmentType === 'collection' && (
                <div className="space-y-4">
                  <div className="p-3 bg-oasis-cyan/10 rounded-lg text-sm text-oasis-navy">
                    📍 {COLLECTION_POINT}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collection Date</label>
                    <input
                      type="date"
                      value={collectionDate}
                      onChange={(e) => setCollectionDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
                    <div className="grid grid-cols-1 gap-2">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setCollectionTimeSlot(slot)}
                          className={`text-sm py-2 px-3 rounded-lg border text-left transition-colors ${
                            collectionTimeSlot === slot
                              ? 'border-oasis-cyan bg-oasis-cyan/5 text-oasis-navy font-medium'
                              : 'border-gray-200 text-gray-600'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {fulfillmentType === 'delivery' && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-700">Select Delivery Address</h3>
                  {addresses.map((addr) => (
                    <button
                      key={addr.id}
                      onClick={() => setSelectedAddressId(addr.id)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                        selectedAddressId === addr.id
                          ? 'border-oasis-cyan bg-oasis-cyan/5'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-oasis-navy">{addr.label || addr.type}</p>
                          <p className="text-xs text-gray-500">{addr.street}, {addr.suburb}, {addr.city}</p>
                        </div>
                        {addr.isDefault && (
                          <span className="text-xs bg-oasis-cyan/20 text-oasis-navy px-2 py-0.5 rounded-full">Default</span>
                        )}
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="w-full py-2 border-2 border-dashed border-gray-200 rounded-lg text-sm text-gray-500 hover:border-oasis-cyan hover:text-oasis-navy transition-colors"
                  >
                    + Add New Address
                  </button>
                  {showAddAddress && (
                    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
                      <h4 className="text-sm font-semibold text-oasis-navy">New Address</h4>
                      <input
                        type="text"
                        placeholder="Street address"
                        value={newAddress.street}
                        onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                      />
                      <input
                        type="text"
                        placeholder="Suburb"
                        value={newAddress.suburb}
                        onChange={(e) => setNewAddress({ ...newAddress, suburb: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                      />
                      <select
                        value={newAddress.type}
                        onChange={(e) => setNewAddress({ ...newAddress, type: e.target.value as 'home' | 'office' | 'other' })}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                      >
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                        <option value="other">Other</option>
                      </select>
                      <div className="flex gap-2">
                        <button onClick={handleAddAddress} className="flex-1 bg-oasis-cyan text-oasis-navy font-medium py-2 rounded-lg text-sm">Save</button>
                        <button onClick={() => setShowAddAddress(false)} className="flex-1 border border-gray-200 text-gray-500 py-2 rounded-lg text-sm">Cancel</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-oasis-navy text-lg mb-4">Payment Method</h2>
              {([
                { value: 'cash', label: '💵 Cash on Delivery' },
                { value: 'ecocash', label: '📱 EcoCash' },
                { value: 'card', label: '💳 Card Payment' },
                { value: 'zipit', label: '🏦 ZiPIT' },
              ] as { value: PaymentMethod; label: string }[]).map((pm) => (
                <button
                  key={pm.value}
                  onClick={() => setPaymentMethod(pm.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-colors ${
                    paymentMethod === pm.value
                      ? 'border-oasis-cyan bg-oasis-cyan/5 text-oasis-navy font-medium'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {pm.label}
                </button>
              ))}
              {paymentMethod === 'ecocash' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">EcoCash Number</label>
                  <input
                    type="tel"
                    value={ecocashNumber}
                    onChange={(e) => setEcocashNumber(e.target.value)}
                    placeholder="+263 77 123 4567"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-semibold text-oasis-navy text-lg mb-4">Order Review</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Customer</span><span className="font-medium">{customer.firstName} {customer.lastName}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Phone</span><span className="font-medium">{customer.phone}</span></div>
                <div className="flex justify-between text-sm"><span className="text-gray-500">Fulfillment</span><span className="font-medium capitalize">{fulfillmentType}</span></div>
                {fulfillmentType === 'collection' && collectionDate && (
                  <div className="flex justify-between text-sm"><span className="text-gray-500">Collection</span><span className="font-medium">{collectionDate} • {collectionTimeSlot}</span></div>
                )}
                <div className="flex justify-between text-sm"><span className="text-gray-500">Payment</span><span className="font-medium capitalize">{paymentMethod}</span></div>
              </div>
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-oasis-navy mb-2">Items</h3>
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm py-1">
                    <span className="text-gray-600">{item.product.name} x{item.quantity}</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-oasis-navy">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-lg font-medium hover:border-oasis-navy hover:text-oasis-navy transition-colors"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-oasis-navy text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-oasis-navy/90 transition-colors"
            >
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              className="flex-1 bg-oasis-cyan text-oasis-navy py-3 rounded-lg font-bold hover:bg-oasis-cyan/90 transition-colors"
            >
              Confirm Order
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
