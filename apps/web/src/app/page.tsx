'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { Store, ArrowRight, CheckCircle, Users, Package, Truck, Shield } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-100">
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Store className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-slate-800">DESTA MARKET</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <button className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            Ethiopia's Premier B2B Marketplace
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Connect shopkeepers, suppliers, and delivery agents in one powerful platform. 
            Streamline your supply chain with real-time tracking and secure payments.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <button className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <button className="px-8 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Users,
              title: 'For Shopkeepers',
              description: 'Browse products from multiple suppliers, place orders, and track deliveries in real-time.',
              color: 'bg-blue-500',
            },
            {
              icon: Package,
              title: 'For Suppliers',
              description: 'Manage your inventory, receive orders, and grow your business with secure payments.',
              color: 'bg-emerald-500',
            },
            {
              icon: Truck,
              title: 'For Delivery Agents',
              description: 'Accept delivery requests, track routes, and earn money with flexible schedules.',
              color: 'bg-orange-500',
            },
          ].map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-slate-200 hover:shadow-md transition">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Why Choose DESTA MARKET?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Payments', description: 'Telebirr-like escrow system protects both buyers and sellers' },
              { icon: Truck, title: 'Real-time Tracking', description: 'GPS-enabled delivery tracking with live updates' },
              { icon: CheckCircle, title: 'Verified Sellers', description: 'All suppliers are verified for quality and reliability' },
              { icon: Users, title: '24/7 Support', description: 'Dedicated customer support for all users' },
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="h-6 w-6 text-emerald-400" />
            <span className="text-xl font-bold">DESTA MARKET</span>
          </div>
          <p className="text-slate-400 text-sm">
            © 2024 DESTA B2B MARKET. All rights reserved. Ethiopian B2B Marketplace Platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
