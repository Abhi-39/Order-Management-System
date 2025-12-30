
import React, { useState, createContext, useContext, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCircle, 
  ShoppingCart, 
  Package, 
  Settings,
  Menu,
  X,
  ChevronRight,
  Loader2
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Dealers from './pages/Dealers';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import Products from './pages/Products';

import { Dealer, Client, Product, Order } from './types';
import { api } from './api';

// Context for global state
interface DataContextType {
  dealers: Dealer[];
  clients: Client[];
  products: Product[];
  orders: Order[];
  loading: boolean;
  refreshData: () => Promise<void>;
  setDealers: (dealers: Dealer[]) => void; // For local optimistic updates if needed
  setClients: (clients: Client[]) => void;
  setProducts: (products: Product[]) => void;
  setOrders: (orders: Order[]) => void;
  // Specific async actions
  saveDealer: (dealer: Dealer) => Promise<void>;
  deleteDealer: (id: string) => Promise<void>;
  saveClient: (client: Client) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  saveOrder: (order: Order) => Promise<void>;
  deleteOrder: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    {label && <span className="font-medium">{label}</span>}
  </Link>
);

const LoadingOverlay = () => (
  <div className="fixed inset-0 z-[9999] bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
    <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center space-y-4">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      <p className="text-sm font-bold text-gray-900">Connecting to Server...</p>
    </div>
  </div>
);

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { loading } = useData();
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {loading && <LoadingOverlay />}
      <aside className={`bg-gray-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} hidden md:flex flex-col`}>
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold tracking-tight text-blue-400">OmniOrder</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <SidebarLink to="/" icon={LayoutDashboard} label={sidebarOpen ? "Dashboard" : ""} active={location.pathname === '/'} />
          <SidebarLink to="/dealers" icon={Users} label={sidebarOpen ? "Dealers" : ""} active={location.pathname === '/dealers'} />
          <SidebarLink to="/clients" icon={UserCircle} label={sidebarOpen ? "Clients" : ""} active={location.pathname === '/clients'} />
          <SidebarLink to="/orders" icon={ShoppingCart} label={sidebarOpen ? "Orders" : ""} active={location.pathname === '/orders'} />
          <SidebarLink to="/products" icon={Package} label={sidebarOpen ? "Products" : ""} active={location.pathname === '/products'} />
        </nav>

        <div className="p-4 border-t border-gray-800">
           <SidebarLink to="/settings" icon={Settings} label={sidebarOpen ? "Settings" : ""} active={location.pathname === '/settings'} />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span className="capitalize">{location.pathname.replace('/', '') || 'Dashboard'}</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 font-medium">Overview</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              AD
            </div>
          </div>
        </header>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      const [d, c, p, o] = await Promise.all([
        api.dealers.getAll(),
        api.clients.getAll(),
        api.products.getAll(),
        api.orders.getAll()
      ]);
      setDealers(d);
      setClients(c);
      setProducts(p);
      setOrders(o);
    } catch (error) {
      console.error('Failed to fetch data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Sync Wrappers
  const saveDealer = async (dealer: Dealer) => {
    setLoading(true);
    await api.dealers.save(dealer);
    await refreshData();
  };
  const deleteDealer = async (id: string) => {
    setLoading(true);
    await api.dealers.delete(id);
    await refreshData();
  };
  const saveClient = async (client: Client) => {
    setLoading(true);
    await api.clients.save(client);
    await refreshData();
  };
  const deleteClient = async (id: string) => {
    setLoading(true);
    await api.clients.delete(id);
    await refreshData();
  };
  const saveProduct = async (product: Product) => {
    setLoading(true);
    await api.products.save(product);
    await refreshData();
  };
  const deleteProduct = async (id: string) => {
    setLoading(true);
    await api.products.delete(id);
    await refreshData();
  };
  const saveOrder = async (order: Order) => {
    setLoading(true);
    await api.orders.save(order);
    await refreshData();
  };
  const deleteOrder = async (id: string) => {
    setLoading(true);
    await api.orders.delete(id);
    await refreshData();
  };

  return (
    <DataContext.Provider value={{ 
      dealers, clients, products, orders, loading, refreshData,
      setDealers, setClients, setProducts, setOrders,
      saveDealer, deleteDealer, saveClient, deleteClient, saveProduct, deleteProduct, saveOrder, deleteOrder
    }}>
      <HashRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/settings" element={<div className="text-center py-20 text-gray-400 font-medium">Settings management coming soon...</div>} />
          </Routes>
        </AppLayout>
      </HashRouter>
    </DataContext.Provider>
  );
};

export default App;
