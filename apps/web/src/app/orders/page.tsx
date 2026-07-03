'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Search, 
  Filter,
  Package,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Truck,
  XCircle
} from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        if (token) {
          const data = await api.getOrders(token);
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, router, token]);

  if (!isAuthenticated) {
    return null;
  }

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return CheckCircle;
      case 'PENDING':
        return Clock;
      case 'PROCESSING':
        return Package;
      case 'SHIPPED':
        return Truck;
      case 'CANCELLED':
        return XCircle;
      default:
        return Clock;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Orders</h1>
            <p className="text-slate-500 mt-1">
              {user?.role === 'SHOPKEEPER' ? 'Manage your purchase orders' : 'View incoming orders'}
            </p>
          </div>
          {user?.role === 'SHOPKEEPER' && (
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <ShoppingCart className="mr-2 h-4 w-4" />
              New Order
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
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
            <p className="mt-4 text-slate-500">Loading orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
            <ShoppingCart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-800 mb-2">No orders found</h3>
            <p className="text-slate-500">
              {user?.role === 'SHOPKEEPER' 
                ? 'Start browsing products and place your first order.' 
                : 'No orders have been placed yet.'}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Order ID</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Date</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Total</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <tr key={order.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-800">{order.id.slice(0, 8)}...</span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-emerald-600">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">{order.total}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
