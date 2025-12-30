
import React, { useState } from 'react';
import { Plus, Search, MapPin, Phone, Mail, X, Pencil, Trash2 } from 'lucide-react';
import { useData } from '../App';
import { Dealer } from '../types';

const Dealers = () => {
  const { dealers, setDealers } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDealer, setEditingDealer] = useState<Dealer | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    dealerCode: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: ''
  });

  const filteredDealers = dealers.filter(dealer => 
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dealer.dealerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (dealer?: Dealer) => {
    if (dealer) {
      setEditingDealer(dealer);
      setFormData({
        name: dealer.name,
        dealerCode: dealer.dealerCode,
        contactPerson: dealer.contactPerson,
        email: dealer.email,
        phone: dealer.phone,
        city: dealer.city
      });
    } else {
      setEditingDealer(null);
      setFormData({ name: '', dealerCode: '', contactPerson: '', email: '', phone: '', city: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveDealer = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDealer) {
      setDealers(dealers.map(d => d.id === editingDealer.id ? { ...editingDealer, ...formData } : d));
    } else {
      const newDealer: Dealer = {
        id: Date.now().toString(),
        ...formData,
        status: 'ACTIVE'
      };
      setDealers([newDealer, ...dealers]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteDealer = (id: string) => {
    if (window.confirm('Are you sure you want to delete this dealer? All associated data might be affected.')) {
      setDealers(dealers.filter(d => d.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dealers</h1>
          <p className="text-gray-500">Manage your manufacturing distribution network</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add New Dealer</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search by name or code..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDealers.map((dealer) => (
          <div key={dealer.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl uppercase">
                  {dealer.name.charAt(0)}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${dealer.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {dealer.status}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900">{dealer.name}</h3>
              <p className="text-blue-600 text-xs font-semibold uppercase tracking-wider mb-4">{dealer.dealerCode}</p>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{dealer.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-gray-400" />
                  <span>{dealer.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 italic">
                  <Mail size={16} />
                  <span className="truncate">{dealer.email}</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 border-t rounded-b-xl flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => openModal(dealer)}
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
              >
                <Pencil size={14} />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => handleDeleteDealer(dealer.id)}
                className="text-sm font-semibold text-red-600 hover:text-red-800 flex items-center space-x-1"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">{editingDealer ? 'Edit Dealer' : 'Add New Dealer'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveDealer} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dealer Name</label>
                  <input required type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dealer Code</label>
                  <input required type="text" placeholder="e.g. DLR-00X" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.dealerCode} onChange={(e) => setFormData({...formData, dealerCode: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input required type="tel" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Save Dealer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dealers;
