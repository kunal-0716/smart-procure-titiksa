import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { Calendar, QrCode, AlertCircle, CheckCircle2, ChevronRight, ListOrdered, FileText } from 'lucide-react';

export default function FarmerDashboard() {
  const currentUser = useAppStore(state => state.currentUser);
  const farmers = useAppStore(state => state.farmers);
  const allBookings = useAppStore(state => state.bookings);
  const centres = useAppStore(state => state.centres);
  const allReceipts = useAppStore(state => state.receipts);
  const allNotifications = useAppStore(state => state.notifications);

  const farmer = farmers.find(f => f.id === currentUser?.id);
  const bookings = allBookings.filter(b => b.farmerId === currentUser?.id);
  const receipts = allReceipts.filter(r => r.farmerId === currentUser?.id);
  const notifications = allNotifications.filter(n => n.farmerId === currentUser?.id && !n.read);

  const activeBooking = bookings.find(b => b.status === 'CONFIRMED');
  const activeCentre = centres.find(c => c.id === activeBooking?.centreId);
  const recentReceipt = receipts.length > 0 ? receipts[receipts.length - 1] : null;

  if (!farmer) return <div className="p-4 text-gray-500">Loading...</div>;

  return (
    <div className="space-y-5 pb-8">
      {/* Welcome & Verification Status */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Hello, {farmer.name.split(' ')[0]}</h2>
          <div className="mt-1 flex items-center gap-1.5 text-sm">
            {farmer.status === 'VERIFIED' ? (
              <span className="flex items-center gap-1 text-green-700 font-medium bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="flex items-center gap-1 text-orange-700 font-medium bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">
                <AlertCircle className="w-3.5 h-3.5" /> {farmer.status}
              </span>
            )}
          </div>
        </div>
        {notifications.length > 0 && (
          <Link to="/farmer/notifications" className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
            {notifications.length} New
          </Link>
        )}
      </div>

      {/* Main Action or Active Booking */}
      {activeBooking ? (
        <div className="bg-white border border-blue-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-start">
            <div>
              <span className="inline-block px-2 py-1 bg-blue-500 rounded-md text-xs font-semibold mb-2">UPCOMING APPOINTMENT</span>
              <h3 className="text-lg font-bold">{activeCentre?.name}</h3>
              <p className="text-blue-100 text-sm">{new Date(activeBooking.date).toLocaleDateString()} • {activeBooking.timeWindow}</p>
            </div>
            <Link to={`/farmer/qr/${activeBooking.id}`} className="bg-white text-blue-600 p-3 rounded-xl shadow-sm flex flex-col items-center gap-1">
              <QrCode className="w-6 h-6" />
              <span className="text-[10px] font-bold">PASS</span>
            </Link>
          </div>
          
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-3">
              <span className="text-gray-500">Expected Quantity</span>
              <span className="font-bold text-gray-900">{activeBooking.expectedQuantity} KG • {activeBooking.crop}</span>
            </div>

            {/* Capacity Release Confirmation (Pre-appointment) */}
            {activeBooking.preAppointmentConfirmed === null && (
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <p className="text-sm text-orange-900 font-medium mb-3">
                  Your appointment is tomorrow. Will you be available?
                </p>
                <div className="flex gap-3">
                  <ConfirmationButtons bookingId={activeBooking.id} />
                </div>
              </div>
            )}

            {/* Queue Access if confirmed */}
            {activeBooking.preAppointmentConfirmed === true && (
              <Link to="/farmer/queue" className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <ListOrdered className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Check Live Queue</p>
                    <p className="text-xs text-gray-500">Track your position</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to Procure?</h3>
          <p className="text-gray-500 text-sm mb-6">Book an appointment at your nearest centre based on your expected produce quantity.</p>
          <Link
            to="/farmer/book"
            className="block w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-transform"
          >
            Book Procurement Slot
          </Link>
        </div>
      )}

      {/* Recent Transaction */}
      {recentReceipt && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3 ml-1">Recent Procurement</h3>
          <Link to={`/farmer/receipt/${recentReceipt.id}`} className="block bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{recentReceipt.actualQuantity} KG {recentReceipt.crop}</p>
                <p className="text-xs text-gray-500">{new Date(recentReceipt.date).toLocaleDateString()} • ₹{recentReceipt.totalAmount}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Link>
        </div>
      )}
    </div>
  );
}

function ConfirmationButtons({ bookingId }: { bookingId: string }) {
  const confirm = useAppStore(state => state.confirmPreAppointment);
  
  return (
    <>
      <button
        onClick={() => confirm(bookingId, true)}
        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold shadow-sm"
      >
        YES
      </button>
      <button
        onClick={() => confirm(bookingId, false)}
        className="flex-1 bg-white text-gray-700 border border-gray-300 py-2.5 rounded-lg text-sm font-semibold"
      >
        NO - Release
      </button>
    </>
  );
}
