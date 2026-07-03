'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  MapPin, 
  Clock,
  CheckCircle,
  Navigation,
  Phone
} from 'lucide-react';

export default function DeliveriesPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [deliveries, setDeliveries] = useState<any[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const mockDeliveries = [
    {
      id: '1',
      customerName: 'Abebe Kebede',
      address: 'Bole Subcity, Addis Ababa',
      status: 'IN_TRANSIT',
      estimatedTime: '15 mins',
      items: 5,
    },
    {
      id: '2',
      customerName: 'Tigist Haile',
      address: 'Kazanchis, Addis Ababa',
      status: 'PICKED_UP',
      estimatedTime: '25 mins',
      items: 3,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">My Deliveries</h1>
          <p className="text-slate-500 mt-1">Manage your active deliveries</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockDeliveries.map((delivery) => (
            <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-800">{delivery.customerName}</h3>
                  <p className="text-sm text-slate-500 mt-1">{delivery.address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  delivery.status === 'IN_TRANSIT' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {delivery.status.replace('_', ' ')}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <MapPin className="h-4 w-4" />
                  <span>{delivery.address}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>ETA: {delivery.estimatedTime}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Truck className="h-4 w-4" />
                  <span>{delivery.items} items</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Navigation className="mr-2 h-4 w-4" />
                  Navigate
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="mr-2 h-4 w-4" />
                  Call
                </Button>
                <Button variant="outline" className="px-3">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Today's Summary</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-emerald-50 rounded-lg">
              <p className="text-2xl font-bold text-emerald-600">8</p>
              <p className="text-sm text-slate-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">2</p>
              <p className="text-sm text-slate-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">Birr 450</p>
              <p className="text-sm text-slate-600">Earnings</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
