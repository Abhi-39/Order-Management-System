
import { Dealer, Client, Product, Order, OrderStatus, PaymentStatus } from './types';

export const MOCK_DEALERS: Dealer[] = [
  { id: '1', dealerCode: 'DLR001', name: 'Elite Interiors', contactPerson: 'John Smith', email: 'john@elite.com', phone: '9876543210', city: 'Mumbai', status: 'ACTIVE' },
  { id: '2', dealerCode: 'DLR002', name: 'Modern Kitchens', contactPerson: 'Sarah Wilson', email: 'sarah@modern.com', phone: '9876543211', city: 'Delhi', status: 'ACTIVE' },
];

export const MOCK_CLIENTS: Client[] = [
  { id: '101', clientCode: 'CLT001', dealerId: '1', name: 'Robert Downey', phone: '9988776655', city: 'Mumbai' },
  { id: '102', clientCode: 'CLT002', dealerId: '1', name: 'Chris Evans', phone: '9988776656', city: 'Mumbai' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '201', productCode: 'PRD-W-01', name: '3-Door Sliding Wardrobe', category: 'WARDROBE', basePrice: 45000 },
  { id: '202', productCode: 'PRD-K-01', name: 'Island Modular Kitchen', category: 'KITCHEN', basePrice: 125000 },
  { id: '203', productCode: 'PRD-W-02', name: 'Hinged Glass Wardrobe', category: 'WARDROBE', basePrice: 38000 },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: '301',
    orderNumber: 'ORD-2024-001',
    clientId: '101',
    dealerId: '1',
    orderDate: '2024-03-15',
    finalAmount: 170000,
    orderStatus: OrderStatus.PROCESSING,
    paymentStatus: PaymentStatus.PARTIAL,
    items: [
      { id: 'item1', productId: '201', quantity: 1, unitPrice: 45000, totalPrice: 45000 },
      { id: 'item2', productId: '202', quantity: 1, unitPrice: 125000, totalPrice: 125000 },
    ]
  },
  {
    id: '302',
    orderNumber: 'ORD-2024-002',
    clientId: '102',
    dealerId: '1',
    orderDate: '2024-03-18',
    finalAmount: 38000,
    orderStatus: OrderStatus.PLACED,
    paymentStatus: PaymentStatus.PENDING,
    items: [
      { id: 'item3', productId: '203', quantity: 1, unitPrice: 38000, totalPrice: 38000 },
    ]
  }
];
