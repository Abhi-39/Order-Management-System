
import { Dealer, Client, Product, Order, OrderStatus, PaymentStatus } from './types';
import { MOCK_DEALERS, MOCK_CLIENTS, MOCK_PRODUCTS, MOCK_ORDERS } from './mockData';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const STORAGE_KEYS = {
  DEALERS: 'omniorder_dealers',
  CLIENTS: 'omniorder_clients',
  PRODUCTS: 'omniorder_products',
  ORDERS: 'omniorder_orders'
};

const getStorage = <T>(key: string, fallback: T[]): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const setStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const api = {
  dealers: {
    getAll: async (): Promise<Dealer[]> => {
      await delay(500);
      return getStorage(STORAGE_KEYS.DEALERS, MOCK_DEALERS);
    },
    save: async (dealer: Dealer): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.DEALERS, MOCK_DEALERS);
      const exists = data.find(d => d.id === dealer.id);
      const updated = exists 
        ? data.map(d => d.id === dealer.id ? dealer : d)
        : [dealer, ...data];
      setStorage(STORAGE_KEYS.DEALERS, updated);
    },
    delete: async (id: string): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.DEALERS, MOCK_DEALERS);
      setStorage(STORAGE_KEYS.DEALERS, data.filter(d => d.id !== id));
    }
  },
  clients: {
    getAll: async (): Promise<Client[]> => {
      await delay(500);
      return getStorage(STORAGE_KEYS.CLIENTS, MOCK_CLIENTS);
    },
    save: async (client: Client): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.CLIENTS, MOCK_CLIENTS);
      const exists = data.find(c => c.id === client.id);
      const updated = exists 
        ? data.map(c => c.id === client.id ? client : c)
        : [client, ...data];
      setStorage(STORAGE_KEYS.CLIENTS, updated);
    },
    delete: async (id: string): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.CLIENTS, MOCK_CLIENTS);
      setStorage(STORAGE_KEYS.CLIENTS, data.filter(c => c.id !== id));
    }
  },
  products: {
    getAll: async (): Promise<Product[]> => {
      await delay(500);
      return getStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
    },
    save: async (product: Product): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
      const exists = data.find(p => p.id === product.id);
      const updated = exists 
        ? data.map(p => p.id === product.id ? product : p)
        : [product, ...data];
      setStorage(STORAGE_KEYS.PRODUCTS, updated);
    },
    delete: async (id: string): Promise<void> => {
      await delay(500);
      const data = getStorage(STORAGE_KEYS.PRODUCTS, MOCK_PRODUCTS);
      setStorage(STORAGE_KEYS.PRODUCTS, data.filter(p => p.id !== id));
    }
  },
  orders: {
    getAll: async (): Promise<Order[]> => {
      await delay(800);
      return getStorage(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
    },
    save: async (order: Order): Promise<void> => {
      await delay(800);
      const data = getStorage(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
      const exists = data.find(o => o.id === order.id);
      const updated = exists 
        ? data.map(o => o.id === order.id ? order : o)
        : [order, ...data];
      setStorage(STORAGE_KEYS.ORDERS, updated);
    },
    delete: async (id: string): Promise<void> => {
      await delay(800);
      const data = getStorage(STORAGE_KEYS.ORDERS, MOCK_ORDERS);
      setStorage(STORAGE_KEYS.ORDERS, data.filter(o => o.id !== id));
    }
  }
};
