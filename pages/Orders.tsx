
import React, { useState } from 'react';
import { useData } from '../App';
import { Search, Plus, Trash2, X, Package, FileText, CreditCard, Download } from 'lucide-react';
import { Order, OrderStatus, PaymentStatus, OrderItem } from '../types';

const Orders = () => {
  const { orders, dealers, clients, products, saveOrder, deleteOrder } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [orderFormData, setOrderFormData] = useState({
    clientId: '',
    orderDate: new Date().toISOString().split('T')[0],
    paymentStatus: PaymentStatus.PENDING,
    orderStatus: OrderStatus.PLACED,
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const filteredOrders = orders.filter(order => 
    order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm('Cancel and delete this order record?')) {
      await deleteOrder(id);
    }
  };

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    const order = orders.find(o => o.id === id);
    if (order) {
      await saveOrder({ ...order, orderStatus: status });
    }
  };

  const handleAddItem = () => {
    setOrderItems([...orderItems, { id: Date.now().toString(), productId: '', quantity: 1, unitPrice: 0, totalPrice: 0 }]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...orderItems];
    const item = { ...updatedItems[index] };
    
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      item.productId = value;
      item.unitPrice = product?.basePrice || 0;
      item.totalPrice = item.unitPrice * item.quantity;
    } else if (field === 'quantity') {
      item.quantity = parseInt(value) || 0;
      item.totalPrice = item.unitPrice * item.quantity;
    }
    
    updatedItems[index] = item;
    setOrderItems(updatedItems);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleSaveOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = clients.find(c => c.id === orderFormData.clientId);
    if (!client) return alert('Please select a client');
    if (orderItems.length === 0) return alert('Please add at least one product');

    const totalAmount = orderItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const newOrder: Order = {
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: orderFormData.clientId,
      dealerId: client.dealerId,
      orderDate: orderFormData.orderDate,
      finalAmount: totalAmount,
      orderStatus: orderFormData.orderStatus,
      paymentStatus: orderFormData.paymentStatus,
      items: orderItems,
    };

    await saveOrder(newOrder);
    setIsModalOpen(false);
    setOrderItems([]);
    setOrderFormData({ clientId: '', orderDate: new Date().toISOString().split('T')[0], paymentStatus: PaymentStatus.PENDING, orderStatus: OrderStatus.PLACED });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Track and manage product manufacturing lifecycles</p>
        </div>
        <div className="flex space-x-2">
          <button className="border border-gray-200 bg-white text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-50 shadow-sm transition-colors">
            <Download size={20} />
            <span>Export</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 shadow-sm transition-colors"
          >
            <Plus size={20} />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search orders by ID..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 border-b">Order ID</th>
                <th className="px-6 py-4 border-b">Dealer & Client</th>
                <th className="px-6 py-4 border-b">Items</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b">Payment</th>
                <th className="px-6 py-4 border-b">Total</th>
                <th className="px-6 py-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const dealer = dealers.find(d => d.id === order.dealerId);
                const client = clients.find(c => c.id === order.clientId);
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{order.orderNumber}</p>
                      <p className="text-xs text-gray-500">{order.orderDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{client?.name || 'Unknown Client'}</p>
                      <p className="text-xs text-gray-500 italic">{dealer?.name || 'Unknown Dealer'}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.items.length} items</td>
                    <td className="px-6 py-4">
                      <select 
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase border-none focus:ring-1 focus:ring-blue-300 cursor-pointer ${
                          order.orderStatus === 'PLACED' ? 'bg-yellow-100 text-yellow-700' :
                          order.orderStatus === 'PROCESSING' ? 'bg-blue-100 text-blue-700' :
                          order.orderStatus === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      >
                        {Object.values(OrderStatus).map(status => (
                          <option key={status} value={status} className="text-gray-900 bg-white">{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1 text-xs">
                        <CreditCard size={12} className={order.paymentStatus === 'PAID' ? 'text-green-500' : 'text-orange-500'} />
                        <span className={order.paymentStatus === 'PAID' ? 'text-green-600 font-semibold' : 'text-orange-600 font-semibold'}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 text-sm">₹{order.finalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400" title="View Details"><FileText size={18} /></button>
                        <button onClick={() => handleDeleteOrder(order.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-400" title="Cancel Order"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create New Order</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSaveOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Client</label>
                  <select 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white"
                    value={orderFormData.clientId}
                    onChange={(e) => setOrderFormData({...orderFormData, clientId: e.target.value})}
                  >
                    <option value="" className="text-gray-900 bg-white">Select Client</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id} className="text-gray-900 bg-white">{client.name} ({client.clientCode})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                  <input required type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" value={orderFormData.orderDate} onChange={(e) => setOrderFormData({...orderFormData, orderDate: e.target.value})} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 flex items-center space-x-2">
                    <Package size={18} className="text-blue-600" />
                    <span>Order Items</span>
                  </h3>
                  <button type="button" onClick={handleAddItem} className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                    <Plus size={16} />
                    <span>Add Item</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {orderItems.map((item, index) => (
                    <div key={item.id} className="flex items-end space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex-1">
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Product</label>
                        <select required className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-900 bg-white" value={item.productId} onChange={(e) => handleItemChange(index, 'productId', e.target.value)}>
                          <option value="" className="text-gray-900 bg-white">Select Product</option>
                          {products.map(p => <option key={p.id} value={p.id} className="text-gray-900 bg-white">{p.name} (₹{p.basePrice})</option>)}
                        </select>
                      </div>
                      <div className="w-24">
                        <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Qty</label>
                        <input required type="number" min="1" className="w-full px-3 py-2 border border-gray-200 rounded text-sm text-gray-900 bg-white" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                      </div>
                      <div className="w-32 py-2 text-right font-bold text-gray-900">₹{item.totalPrice.toLocaleString()}</div>
                      <button type="button" onClick={() => handleRemoveItem(index)} className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6 font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-2xl">₹{orderItems.reduce((acc, item) => acc + item.totalPrice, 0).toLocaleString()}</span>
                </div>
                <div className="flex space-x-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">Finalize Order</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
