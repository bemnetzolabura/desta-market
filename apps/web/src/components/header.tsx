'use client';

import { useAuthStore } from '@/lib/store';
import { User, Bell } from 'lucide-react';

export function Header() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Welcome, {user.name}
          </h2>
          <p className="text-sm text-slate-500">
            {user.role} Dashboard
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-slate-100">
            <Bell className="h-5 w-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-2 rounded-full">
            <User className="h-4 w-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">{user.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
