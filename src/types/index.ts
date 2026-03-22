export interface Product {
  id: string;
  name: string;
  category: 'water' | 'ice' | 'accessories' | 'dispensers';
  target?: 'b2c' | 'b2b' | 'both';
  size: string;
  price: number;
  image: string;
  description: string;
  stock?: number;
  featured?: boolean;
  minOrderQty?: number;
  qtyIncrement?: number;
  unitType?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type AddressType = 'home' | 'office' | 'other';
export interface Address {
  id: string;
  type: AddressType;
  street: string;
  suburb: string;
  city: string;
  isDefault: boolean;
  label?: string;
}

export interface CollectionSlot {
  time: string;
  available: boolean;
}

export interface CollectionDetails {
  date: Date;
  timeSlot: string;
  location: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
export type PaymentMethod = 'ecocash' | 'zipit' | 'card' | 'cash';
export type PaymentStatus = 'paid' | 'pending';
export type FulfillmentType = 'collection' | 'delivery';

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface Order {
  orderNumber: string;
  orderDate: Date;
  customer: CustomerDetails;
  items: CartItem[];
  total: number;
  fulfillmentType: FulfillmentType;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  collectionDetails: CollectionDetails;
  deliveryAddress?: Address;
  status: OrderStatus;
  ecocashNumber?: string;
}
