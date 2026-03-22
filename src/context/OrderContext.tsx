'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, CartItem, CustomerDetails, PaymentMethod, CollectionDetails, FulfillmentType, Address, OrderStatus, PaymentStatus } from '@/types';
import { demoOrders } from '@/data/orders';

interface OrderContextType {
  orders: Order[];
  createOrder: (
    customer: CustomerDetails,
    items: CartItem[],
    paymentMethod: PaymentMethod,
    collectionDetails: CollectionDetails,
    fulfillmentType: FulfillmentType,
    deliveryAddress?: Address,
    ecocashNumber?: string
  ) => Order;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  updateOrderStatus: (orderNumber: string, status: OrderStatus) => void;
  updatePaymentStatus: (orderNumber: string, paymentStatus: PaymentStatus) => void;
  getOrdersByDate: (date: Date) => Order[];
  getTodaysOrders: () => Order[];
  getOrdersByStatus: (status: OrderStatus) => Order[];
  getAllOrders: () => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

let orderCounter = 1100;

const generateOrderNumber = (): string => {
  orderCounter += 1;
  return `OAS-${String(orderCounter).padStart(6, '0')}`;
};

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(demoOrders);

  const createOrder = (
    customer: CustomerDetails,
    items: CartItem[],
    paymentMethod: PaymentMethod,
    collectionDetails: CollectionDetails,
    fulfillmentType: FulfillmentType,
    deliveryAddress?: Address,
    ecocashNumber?: string
  ): Order => {
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    const newOrder: Order = {
      orderNumber: generateOrderNumber(),
      orderDate: new Date(),
      customer,
      items,
      total,
      fulfillmentType,
      paymentMethod,
      paymentStatus: paymentMethod === 'ecocash' ? 'paid' : 'pending',
      collectionDetails,
      deliveryAddress,
      status: 'pending',
      ecocashNumber,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderByNumber = (orderNumber: string) =>
    orders.find((o) => o.orderNumber === orderNumber);

  const updateOrderStatus = (orderNumber: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
  };

  const updatePaymentStatus = (orderNumber: string, paymentStatus: PaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, paymentStatus } : o))
    );
  };

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const getOrdersByDate = (date: Date) =>
    orders.filter((o) => isSameDay(new Date(o.collectionDetails.date), date));

  const getTodaysOrders = () => getOrdersByDate(new Date());

  const getOrdersByStatus = (status: OrderStatus) =>
    orders.filter((o) => o.status === status);

  const getAllOrders = () => orders;

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderByNumber,
        updateOrderStatus,
        updatePaymentStatus,
        getOrdersByDate,
        getTodaysOrders,
        getOrdersByStatus,
        getAllOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within OrderProvider');
  return context;
}
