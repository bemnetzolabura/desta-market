'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Search, 
  Filter,
  Mail,
  Shield,
  MoreVertical
} from 'lucide-react';

export default function UsersPage() {
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

  const mockUsers = [
    { id: '1', name: 'Abebe Kebede', email: 'abebe@example.com', role: 'SHOPKEEPER', status: 'Active' },
    { id: '2', name: 'Tigist Haile', email: 'tigist@example.com', role: 'SUPPLIER', status: 'Active' },
    { id: '3', name: 'Kaleb Mekonnen', email: 'kaleb@example.com', role: 'AGENT', status: 'Active' },
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700';
      case 'SUPPLIER':
        return 'bg-blue-100 text-blue-700';
      case 'AGENT':
        return 'bg-orange-100 text-orange-700';
      case 'SHOPKEEPER':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Users</h1>
            <p className="text-slate-500 mt-1">Manage platform users and permissions</p>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700">
            <Users className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">User</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Email</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Role</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                        <span className="text-emerald-600 font-semibold">{user.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-slate-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      <Shield className="h-3 w-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
