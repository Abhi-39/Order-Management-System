
import React, { useState } from 'react';
import { useData } from '../App';
import { Search, Plus, X, IndianRupee, Pencil, Trash2 } from 'lucide-react';
import { Product } from '../types';

const Products = () => {
  const { products, saveProduct, deleteProduct } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    productCode: '',
    category: 'WARDROBE' as 'WARDROBE' | 'KITCHEN',
    basePrice: 0
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.productCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        productCode: product.productCode,
        category: product.category,
        basePrice: product.basePrice
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', productCode: '', category: 'WARDROBE', basePrice: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave: Product = editingProduct 
      ? { ...editingProduct, ...formData }
      : { id: Date.now().toString(), ...formData };
    
    await saveProduct(productToSave);
    setIsModalOpen(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Remove this product from catalog?')) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your wardrobe and kitchen manufacturing catalog</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search products by name or code..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white outline-none text-gray-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden group hover:shadow-xl transition-all flex flex-col">
            <div className="h-48 bg-gray-50 flex items-center justify-center relative">
              <img 
                src={`https://picsum.photos/seed/${product.productCode}/400/300`} 
                alt={product.name}
                className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500"
              />
              <span className={`absolute top-2 left-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${
                product.category === 'WARDROBE' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
              }`}>
                {product.category}
              </span>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openModal(product)} className="p-3 bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors shadow-lg"><Pencil size={20} /></button>
                <button onClick={() => handleDeleteProduct(product.id)} className="p-3 bg-white text-red-600 rounded-full hover:bg-red-50 transition-colors shadow-lg"><Trash2 size={20} /></button>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-blue-600 font-semibold uppercase">{product.productCode}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">₹{product.basePrice.toLocaleString()}</span>
                <span className="text-xs text-gray-400">Base Price</span>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-400 font-medium italic">No products found in catalog.</div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editingProduct ? 'Update Product' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                  <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Code</label>
                    <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" value={formData.productCode} onChange={(e) => setFormData({...formData, productCode: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      required 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900" 
                      value={formData.category} 
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    >
                      <option value="WARDROBE" className="text-gray-900 bg-white">Wardrobe</option>
                      <option value="KITCHEN" className="text-gray-900 bg-white">Kitchen</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (₹)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input required type="number" min="0" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 bg-white" value={formData.basePrice} onChange={(e) => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})} />
                  </div>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
