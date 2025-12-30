
export enum OrderStatus {
  PLACED = 'PLACED',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID'
}

export interface Dealer {
  id: string;
  dealerCode: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Client {
  id: string;
  clientCode: string;
  dealerId: string;
  name: string;
  phone: string;
  city: string;
}

export interface Product {
  id: string;
  productCode: string;
  name: string;
  category: 'WARDROBE' | 'KITCHEN';
  basePrice: number;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  clientId: string;
  dealerId: string;
  orderDate: string;
  finalAmount: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
}
