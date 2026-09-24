import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { ArrowLeft, Users, Clock, AlertCircle } from 'lucide-react';

export default function FarmerQueue() {
  const currentUser = useAppStore(state => state.currentUser);
  const bookings = useAppStore(state => state.bookings);
  
  const activeBooking = bookings.find(b => b.farmerId === currentUser?.id && b.status === 'CONFIRMED');
  
  if (!activeBooking) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Live Queue</h2>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center text-gray-500 shadow-sm">
          You don't have an active confirmed booking for today.
        </div>
      </div>
    );
  }

  // Mock Queue logic for demo
  const allBookings = useAppStore(state => state.bookings);
  const queueBookings = allBookings.filter(b => 
    b.centreId === activeBooking.centreId && 
    b.date === activeBooking.date && 
    b.status === 'CONFIRMED'
  );
  
  // Find index (1-based position)
  const position = queueBookings.findIndex(b => b.id === activeBooking.id) + 1;
  const currentlyProcessing = position > 1 ? queueBookings[0] : null;

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        <Link to="/farmer" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Live Queue</h2>
      </div>

      {position === 1 ? (
        <div className="bg-green-600 text-white rounded-2xl p-8 text-center shadow-lg animate-in fade-in zoom-in-95">
          <h3 className="text-2xl font-bold mb-2">It's your turn!</h3>
          <p className="text-green-100 text-sm mb-6">Please approach the procurement officer with your QR pass.</p>
          <div className="text-5xl font-black bg-white/20 inline-block px-6 py-4 rounded-xl border border-white/30 backdrop-blur-sm">
            #1
          </div>
        </div>
      ) : (
        <div className="bg-blue-600 text-white rounded-2xl p-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Users className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-2 uppercase tracking-wider text-sm">Your Position</p>
            <div className="text-6xl font-black mb-4 tracking-tighter">
              #{position}
            </div>
            <p className="text-blue-100 text-sm flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" /> Estimated Wait: ~{(position - 1) * 15} mins
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-100 font-semibold text-gray-900">
          Queue Status Tracker
        </div>
        
        <div className="p-4 space-y-4 relative">
          <div className="absolute left-[31px] top-6 bottom-6 w-0.5 bg-gray-200"></div>

          {currentlyProcessing && (
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border-2 border-white ring-2 ring-gray-50">
                <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex-1">
                <p className="text-xs font-bold text-blue-600 uppercase mb-1">Currently Processing</p>
                <p className="text-sm font-medium text-gray-900">Booking #{currentlyProcessing.id.toUpperCase()}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-4 relative z-10">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 border-2 border-white ring-2 ring-gray-50">
              <span className="text-xs font-bold text-gray-500">#{position}</span>
            </div>
            <div className="border border-gray-200 rounded-xl p-3 flex-1">
              <p className="text-xs font-bold text-gray-500 uppercase mb-1">Your Turn</p>
              <p className="text-sm font-medium text-gray-900">Booking #{activeBooking.id.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex gap-3 text-sm text-orange-800">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>Please remain near the procurement area. If you miss your turn, your booking may be cancelled.</p>
      </div>
    </div>
  );
}
