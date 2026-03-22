'use client';

import { useState } from 'react';
import { products as initialProducts } from '@/data/products';
import { Product } from '@/types';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Partial<Product>>({});

  const handleEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    setAdding(false);
  };

  const handleAdd = () => {
    setAdding(true);
    setEditing(null);
    setForm({ category: 'water', target: 'b2c' });
  };

  const handleSave = () => {
    if (adding) {
      const newP: Product = {
        id: `p${Date.now()}`,
        name: form.name || '',
        category: form.category || 'water',
        size: form.size || '',
        price: Number(form.price) || 0,
        image: '',
        description: form.description || '',
        target: form.target,
        minOrderQty: form.minOrderQty,
        qtyIncrement: form.qtyIncrement,
        unitType: form.unitType,
      };
      setProductList((prev) => [...prev, newP]);
    } else if (editing) {
      setProductList((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...form } as Product : p)));
    }
    setEditing(null);
    setAdding(false);
    setForm({});
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  const FormField = ({ label, field, type = 'text' }: { label: string; field: keyof Product; type?: string }) => (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={(form[field] as string | number) ?? ''}
        onChange={(e) => setForm({ ...form, [field]: type === 'number' ? Number(e.target.value) : e.target.value })}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
      />
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-oasis-navy">Products</h1>
        <button onClick={handleAdd} className="flex items-center gap-2 bg-oasis-cyan text-oasis-navy font-semibold px-4 py-2 rounded-lg hover:bg-oasis-cyan/90">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {(adding || editing) && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="font-semibold text-oasis-navy mb-4">{adding ? 'Add Product' : 'Edit Product'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Name" field="name" />
            <FormField label="Size" field="size" />
            <FormField label="Price ($)" field="price" type="number" />
            <FormField label="Description" field="description" />
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
              <select
                value={form.category || 'water'}
                onChange={(e) => setForm({ ...form, category: e.target.value as Product['category'] })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-oasis-cyan"
              >
                <option value="water">Water</option>
                <option value="ice">Ice</option>
                <option value="dispensers">Dispensers</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>
            <FormField label="Min Order Qty" field="minOrderQty" type="number" />
            <FormField label="Qty Increment" field="qtyIncrement" type="number" />
            <FormField label="Unit Type" field="unitType" />
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={handleSave} className="bg-oasis-cyan text-oasis-navy font-semibold px-6 py-2 rounded-lg">Save</button>
            <button onClick={() => { setEditing(null); setAdding(false); }} className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Category</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Size</th>
              <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
              <th className="text-right py-3 px-4 font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{p.name}</td>
                <td className="py-3 px-4 capitalize text-gray-500">{p.category}</td>
                <td className="py-3 px-4 text-gray-500">{p.size}</td>
                <td className="py-3 px-4 font-semibold text-oasis-navy">${p.price.toFixed(2)}</td>
                <td className="py-3 px-4 flex justify-end gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-500 hover:text-blue-700"><Pencil size={16} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
