import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { Search, QrCode, PlayCircle } from 'lucide-react';

export default function OperatorQueue() {
  const navigate = useNavigate();
  const { bookings, farmers, centres } = useAppStore();
  
  // For demo, just showing all confirmed bookings for today.
  const today = '2026-09-25'; // Hardcoded demo date
  
  const queue = bookings
    .filter(b => b.date === today && b.status === 'CONFIRMED')
    .map(b => {
      const farmer = farmers.find(f => f.id === b.farmerId);
      const centre = centres.find(c => c.id === b.centreId);
      return { ...b, farmer, centre };
    });

  const [scanOpen, setScanOpen] = useState(false);
  const [scanResult, setScanResult] = useState('');

  const handleSimulateScan = () => {
    // Pick the first booking in the queue for the demo scan
    if (queue.length > 0) {
      setScanResult(queue[0].id);
      setTimeout(() => {
        navigate(`/operator/procurement/${queue[0].id}`);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Queue</h2>
          <p className="text-sm text-gray-500 mt-1">Manage today's procurement appointments.</p>
        </div>
        
        <button 
          onClick={() => setScanOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 shadow-sm"
        >
          <QrCode className="w-5 h-5" />
          Scan Demo QR
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search farmer or booking ID..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Queue #</th>
                <th className="px-6 py-3">Farmer</th>
                <th className="px-6 py-3">Booking ID</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Exp. Qty</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {queue.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No farmers in the queue for today.
                  </td>
                </tr>
              ) : queue.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.farmer?.name}</div>
                    <div className="text-gray-500 text-xs">{item.farmer?.village}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{item.id.toUpperCase()}</td>
                  <td className="px-6 py-4">{item.timeWindow}</td>
                  <td className="px-6 py-4">{item.expectedQuantity} KG</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      Waiting
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/operator/procurement/${item.id}`)}
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      <PlayCircle className="w-4 h-4" /> Start
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {scanOpen && (
        <div className="fixed inset-0 bg-gray-900/50 flex flex-col items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 text-center space-y-6">
            <h3 className="text-lg font-bold text-gray-900">Scan Demo QR</h3>
            
            <div className="bg-gray-100 aspect-square rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              {scanResult ? (
                <div className="text-green-600 font-medium flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <QrCode className="w-6 h-6" />
                  </div>
                  Detected: {scanResult.toUpperCase()}
                  <p className="text-xs text-gray-500 mt-2">Loading details...</p>
                </div>
              ) : (
                <button 
                  onClick={handleSimulateScan}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-sm"
                >
                  Simulate Successful Scan
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setScanOpen(false)}
              className="text-gray-500 text-sm font-medium hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
