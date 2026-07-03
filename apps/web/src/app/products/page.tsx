'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { 
  Package, 
  Plus, 
  Search, 
  Filter,
  Edit,
  Trash2,
  DollarSign,
  Box
} from 'lucide-react';

export default function ProductsPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      try {
        if (token) {
          const data = await api.getProducts(token);
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isAuthenticated, router, token]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Products</h1>
            <p className="text-slate-500 mt-1">
              {user?.role === 'SUPPLIER' ? 'Manage your product inventory' : 'Browse available products'}
            </p>
          </div>
          {user?.role === 'SUPPLIER' && (
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No products found</h3>
            <p className="text-slate-500">
              {user?.role === 'SUPPLIER' 
                ? 'Start by adding your first product to the marketplace.' 
                : 'There are no products available at the moment.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div className="h-48 bg-gradient-to-br from-emerald-100 to-slate-100 flex items-center justify-center">
                  <Package className="h-16 w-16 text-emerald-600" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-800 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-emerald-600">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-bold">{product.price}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <Box className="h-4 w-4" />
                      <span className="text-sm">{product.stock} in stock</span>
                    </div>
                  </div>
                  {user?.role === 'SUPPLIER' && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                        <Trash2 className="mr-1 h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  )}
                  {user?.role === 'SHOPKEEPER' && (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Add New Product</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Price (Birr)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="0"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                  >
                    Add Product
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
