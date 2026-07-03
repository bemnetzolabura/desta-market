'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  DollarSign,
  Package,
  BarChart3
} from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'ADMIN') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'ADMIN') {
    return null;
  }

  const stats = [
    { label: 'Total Revenue', value: 'Birr 2.4M', change: '+12%', icon: DollarSign, color: 'bg-emerald-500' },
    { label: 'Active Users', value: '1,234', change: '+8%', icon: Users, color: 'bg-blue-500' },
    { label: 'Orders', value: '8,456', change: '+23%', icon: ShoppingCart, color: 'bg-purple-500' },
    { label: 'Products', value: '3,789', change: '+5%', icon: Package, color: 'bg-orange-500' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
          <p className="text-slate-500 mt-1">Platform performance metrics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-emerald-600">{stat.change}</span>
                </div>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">Revenue Trend</h3>
              <BarChart3 className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                <p className="text-slate-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-800">User Growth</h3>
              <Users className="h-5 w-5 text-slate-400" />
            </div>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="text-slate-500">Chart visualization would go here</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">New order placed</p>
                  <p className="text-xs text-slate-500">{i * 5} minutes ago</p>
                </div>
                <span className="text-sm font-semibold text-emerald-600">+Birr {(i * 150).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
