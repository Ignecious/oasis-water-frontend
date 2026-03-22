'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Address } from '@/types';

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  setDefaultAddress: (id: string) => void;
  deleteAddress: (id: string) => void;
  getDefaultAddress: () => Address | undefined;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

const defaultAddresses: Address[] = [
  { id: '1', type: 'home', street: '15 Borrowdale Road', suburb: 'Borrowdale', city: 'Harare', isDefault: true, label: 'Home' },
  { id: '2', type: 'office', street: '42 Samora Machel Avenue', suburb: 'CBD', city: 'Harare', isDefault: false, label: 'Office' },
];

export function AddressProvider({ children }: { children: ReactNode }) {
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = { ...address, id: Date.now().toString() };
    if (address.isDefault) {
      setAddresses((prev) => [
        ...prev.map((a) => ({ ...a, isDefault: false })),
        newAddress,
      ]);
    } else {
      setAddresses((prev) => [...prev, newAddress]);
    }
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  const getDefaultAddress = () => addresses.find((a) => a.isDefault);

  return (
    <AddressContext.Provider value={{ addresses, addAddress, setDefaultAddress, deleteAddress, getDefaultAddress }}>
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const context = useContext(AddressContext);
  if (!context) throw new Error('useAddress must be used within AddressProvider');
  return context;
}
