import { useAppStore } from '../../store/store';
import { Users, Building2, TrendingUp, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { farmers, centres, bookings } = useAppStore();
  
  const verifiedFarmers = farmers.filter(f => f.status === 'VERIFIED').length;
  
  const today = '2026-09-25'; // Mock today
  const todayBookings = bookings.filter(b => b.date === today);
  const totalExpectedQty = todayBookings.reduce((sum, b) => sum + b.expectedQuantity, 0);
  const completedToday = todayBookings.filter(b => b.status === 'COMPLETED').length;

  const stats = [
    { label: 'Active Centres', value: centres.length, icon: Building2, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Verified Farmers', value: verifiedFarmers, icon: Users, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Today Expected (KG)', value: totalExpectedQty, icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Completed Procurements', value: completedToday, icon: CheckCircle, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">State Overview</h2>
        <p className="text-sm text-gray-500 mt-1">Real-time monitoring of all procurement centres.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">Centre Performance (Today)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="text-gray-500 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Centre Name</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Capacity/Hr</th>
                <th className="px-6 py-3">Expected Total Qty</th>
                <th className="px-6 py-3">Completed Qty</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {centres.map(centre => {
                const cBookings = todayBookings.filter(b => b.centreId === centre.id);
                const cExpected = cBookings.reduce((sum, b) => sum + b.expectedQuantity, 0);
                const cCompleted = cBookings
                  .filter(b => b.status === 'COMPLETED')
                  .reduce((sum, b) => sum + b.expectedQuantity, 0); // Assuming actual ~= expected for demo dashboard

                return (
                  <tr key={centre.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{centre.name}</td>
                    <td className="px-6 py-4 text-gray-500">{centre.location}</td>
                    <td className="px-6 py-4">{centre.capacityPerHour} KG</td>
                    <td className="px-6 py-4">{cExpected} KG</td>
                    <td className="px-6 py-4">{cCompleted} KG</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        Operational
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
