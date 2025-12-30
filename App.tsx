
import React, { useState, createContext, useContext } from 'react';
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
  ChevronRight
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import Dealers from './pages/Dealers';
import Clients from './pages/Clients';
import Orders from './pages/Orders';
import Products from './pages/Products';

import { MOCK_DEALERS, MOCK_CLIENTS, MOCK_PRODUCTS, MOCK_ORDERS } from './mockData';
import { Dealer, Client, Product, Order } from './types';

// Context for global state
interface DataContextType {
  dealers: Dealer[];
  clients: Client[];
  products: Product[];
  orders: Order[];
  setDealers: React.Dispatch<React.SetStateAction<Dealer[]>>;
  setClients: React.Dispatch<React.SetStateAction<Client[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
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

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
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
  const [dealers, setDealers] = useState<Dealer[]>(MOCK_DEALERS);
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

  return (
    <DataContext.Provider value={{ dealers, clients, products, orders, setDealers, setClients, setProducts, setOrders }}>
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
