import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { Users, Scale, AlertTriangle, ArrowRight } from 'lucide-react';

export default function OperatorDashboard() {
  const { bookings, centres } = useAppStore();
  
  const today = '2026-09-25'; // Hardcoded demo date
  const myCentreId = 'c1'; // Mocking that this operator is assigned to c1
  const centre = centres.find(c => c.id === myCentreId);
  
  const todayBookings = bookings.filter(b => b.date === today && b.centreId === myCentreId);
  const queue = todayBookings.filter(b => b.status === 'CONFIRMED');
  const completed = todayBookings.filter(b => b.status === 'COMPLETED');
  
  const expectedTotalQty = todayBookings.reduce((sum, b) => sum + b.expectedQuantity, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Centre Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1">{centre?.name} | {today}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-500">Farmers in Queue</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">{queue.length}</h3>
          </div>
          <Link to="/operator/queue" className="mt-4 text-blue-600 text-sm font-medium flex items-center gap-1 hover:text-blue-800">
            View Live Queue <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Scale className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-sm font-medium text-gray-500">Expected Total Qty</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{expectedTotalQty} <span className="text-lg font-medium text-gray-500">KG</span></h3>
          <p className="text-xs text-gray-500 mt-4">Capacity: {centre?.capacityPerHour} KG/hr</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-gray-500">Procurements Completed</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{completed.length}</h3>
          <p className="text-xs text-gray-500 mt-4">Today</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" /> Report Incident
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Report any equipment failure, power outage, or other issues affecting procurement points.
          </p>
          <button className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50">
            Log New Incident
          </button>
        </div>
      </div>
    </div>
  );
}

function CheckCircleIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
