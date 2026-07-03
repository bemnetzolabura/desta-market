'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Truck, 
  Users, 
  LogOut,
  Store
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  if (!user) return null;

  const navItems = {
    SHOPKEEPER: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/products', icon: Package, label: 'Products' },
      { href: '/orders', icon: ShoppingCart, label: 'Orders' },
    ],
    SUPPLIER: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/products', icon: Package, label: 'My Products' },
      { href: '/orders', icon: ShoppingCart, label: 'Orders' },
    ],
    AGENT: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/deliveries', icon: Truck, label: 'Deliveries' },
    ],
    ADMIN: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { href: '/users', icon: Users, label: 'Users' },
      { href: '/products', icon: Package, label: 'Products' },
      { href: '/orders', icon: ShoppingCart, label: 'Orders' },
      { href: '/analytics', icon: Store, label: 'Analytics' },
    ],
  };

  const items = navItems[user.role as keyof typeof navItems] || [];

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-emerald-400">DESTA MARKET</h1>
        <p className="text-sm text-slate-400">B2B Marketplace</p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  isActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-4 border-t border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
