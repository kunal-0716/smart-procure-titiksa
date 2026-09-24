import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { ArrowLeft, QrCode, MapPin, Calendar, Clock, Scale } from 'lucide-react';

export default function FarmerQR() {
  const { id } = useParams();
  const bookings = useAppStore(state => state.bookings);
  const centres = useAppStore(state => state.centres);
  const farmers = useAppStore(state => state.farmers);
  
  const booking = bookings.find(b => b.id === id);
  const centre = centres.find(c => c.id === booking?.centreId);
  const farmer = farmers.find(f => f.id === booking?.farmerId);

  if (!booking || !centre || !farmer) return <div className="p-4">Booking not found</div>;

  return (
    <div className="space-y-6 pb-6 animate-in fade-in zoom-in-95">
      <div className="flex items-center gap-3">
        <Link to="/farmer" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-xl font-bold text-gray-900">Booking Pass</h2>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Pass Header */}
        <div className="bg-blue-600 px-6 py-5 text-white flex justify-between items-center relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500 rounded-full opacity-50"></div>
          <div className="relative z-10">
            <h3 className="font-bold text-lg">{farmer.name}</h3>
            <p className="text-blue-100 text-sm">Booking: {booking.id.toUpperCase()}</p>
          </div>
          <div className="bg-white text-blue-600 px-3 py-1 rounded-md text-sm font-bold relative z-10 shadow-sm">
            {booking.status}
          </div>
        </div>

        {/* QR Section */}
        <div className="p-8 flex flex-col items-center border-b border-dashed border-gray-300 relative">
          <div className="absolute -left-3 -bottom-3 w-6 h-6 bg-gray-50 rounded-full border-r border-t border-gray-300"></div>
          <div className="absolute -right-3 -bottom-3 w-6 h-6 bg-gray-50 rounded-full border-l border-t border-gray-300"></div>
          
          <div className="bg-gray-100 p-6 rounded-2xl">
            {/* Real QR would go here, simulated for MVP */}
            <QrCode className="w-40 h-40 text-gray-900" />
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center max-w-[200px]">Show this QR code to the operator at the procurement centre</p>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-5 bg-gray-50/50 relative">
          <div className="absolute -left-3 -top-3 w-6 h-6 bg-gray-50 rounded-full border-r border-b border-gray-300"></div>
          <div className="absolute -right-3 -top-3 w-6 h-6 bg-gray-50 rounded-full border-l border-b border-gray-300"></div>

          <div className="flex items-start gap-4">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Centre</p>
              <p className="font-bold text-gray-900 mt-0.5">{centre.name}</p>
              <p className="text-sm text-gray-600">{centre.location}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</p>
                <p className="font-bold text-gray-900 mt-0.5">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Time</p>
                <p className="font-bold text-gray-900 mt-0.5">{booking.timeWindow}</p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-2">
            <Scale className="w-5 h-5 text-gray-400 mt-0.5" />
            <div className="w-full">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Expected Produce</p>
              <div className="flex justify-between items-center mt-1">
                <p className="font-bold text-gray-900 text-lg">{booking.expectedQuantity} KG</p>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">{booking.crop}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
