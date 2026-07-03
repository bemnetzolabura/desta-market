'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { api } from '@/lib/api';
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign,
  Truck
} from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, isAuthenticated } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        if (user?.role === 'ADMIN' && token) {
          const data = await api.getAdminDashboard(token);
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated, router, user, token]);

  if (!isAuthenticated) {
    return null;
  }

  const roleDashboards = {
    SHOPKEEPER: {
      title: 'Shopkeeper Dashboard',
      stats: [
        { label: 'Total Orders', value: '12', icon: ShoppingCart, color: 'bg-blue-500' },
        { label: 'Active Orders', value: '3', icon: Package, color: 'bg-emerald-500' },
        { label: 'Pending Deliveries', value: '2', icon: Truck, color: 'bg-orange-500' },
        { label: 'Total Spent', value: 'Birr 45,000', icon: DollarSign, color: 'bg-purple-500' },
      ],
    },
    SUPPLIER: {
      title: 'Supplier Dashboard',
      stats: [
        { label: 'My Products', value: '24', icon: Package, color: 'bg-blue-500' },
        { label: 'Total Orders', value: '18', icon: ShoppingCart, color: 'bg-emerald-500' },
        { label: 'Revenue', value: 'Birr 120,000', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Pending Orders', value: '5', icon: TrendingUp, color: 'bg-orange-500' },
      ],
    },
    AGENT: {
      title: 'Delivery Agent Dashboard',
      stats: [
        { label: 'Active Deliveries', value: '4', icon: Truck, color: 'bg-blue-500' },
        { label: 'Completed Today', value: '8', icon: Package, color: 'bg-emerald-500' },
        { label: 'Total Earnings', value: 'Birr 1,200', icon: DollarSign, color: 'bg-purple-500' },
        { label: 'Rating', value: '4.8/5', icon: TrendingUp, color: 'bg-orange-500' },
      ],
    },
    ADMIN: {
      title: 'Admin Dashboard',
      stats: stats ? [
        { label: 'Total Users', value: stats.users, icon: Users, color: 'bg-blue-500' },
        { label: 'Products', value: stats.products, icon: Package, color: 'bg-emerald-500' },
        { label: 'Orders', value: stats.orders, icon: ShoppingCart, color: 'bg-orange-500' },
        { label: 'Payments', value: stats.payments, icon: DollarSign, color: 'bg-purple-500' },
      ] : [],
    },
  };

  const dashboard = roleDashboards[user?.role as keyof typeof roleDashboards] || roleDashboards.SHOPKEEPER;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">{dashboard.title}</h1>
          <p className="text-slate-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-500 border-r-transparent"></div>
            <p className="mt-4 text-slate-500">Loading dashboard...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboard.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Package className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-800">New order received</p>
                        <p className="text-xs text-slate-500">2 minutes ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <p className="text-sm font-medium text-slate-800">Create new order</p>
                    <p className="text-xs text-slate-500">Start a new purchase</p>
                  </button>
                  <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <p className="text-sm font-medium text-slate-800">View all products</p>
                    <p className="text-xs text-slate-500">Browse available items</p>
                  </button>
                  <button className="w-full text-left p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
                    <p className="text-sm font-medium text-slate-800">Track deliveries</p>
                    <p className="text-xs text-slate-500">Monitor shipment status</p>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
