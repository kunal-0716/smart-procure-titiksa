import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { AlertCircle, ChevronLeft, MapPin, Scale, Wheat, Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

export default function FarmerBook() {
  const navigate = useNavigate();
  const { centres, getAvailableCapacity, addBooking, currentUser, farmers } = useAppStore();
  
  const farmer = farmers.find(f => f.id === currentUser?.id);
  
  const [step, setStep] = useState(1);
  const [crop, setCrop] = useState(farmer?.crops[0] || 'Wheat');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [centreId, setCentreId] = useState(centres[0]?.id || '');
  const [date, setDate] = useState('2026-09-25'); // Mock tomorrow
  const [timeWindow, setTimeWindow] = useState('11:00-12:00');

  if (farmer?.status !== 'VERIFIED') {
    return (
      <div className="bg-orange-50 p-5 rounded-2xl border border-orange-200 text-orange-800 text-center mt-10">
        <AlertCircle className="w-12 h-12 mb-3 mx-auto text-orange-500" />
        <h3 className="text-lg font-bold">Verification Required</h3>
        <p className="text-sm mt-2">You must have a verified profile to book a procurement slot. Please update your details or wait for officer approval.</p>
        <button onClick={() => navigate('/farmer/profile')} className="mt-4 w-full bg-orange-600 text-white font-semibold py-3 rounded-xl">Go to Profile</button>
      </div>
    );
  }

  const availableCapacity = getAvailableCapacity(centreId, date, timeWindow);
  const requested = typeof quantity === 'number' ? quantity : 0;
  const canBook = requested > 0 && requested <= availableCapacity;
  const centre = centres.find(c => c.id === centreId);

  const handleBook = () => {
    if (!canBook) return;
    
    const newBooking = {
      id: `b${Math.floor(Math.random() * 10000)}`,
      farmerId: farmer.id,
      centreId,
      crop,
      date,
      timeWindow,
      expectedQuantity: requested,
      status: 'CONFIRMED' as const,
      preAppointmentConfirmed: null,
    };
    
    addBooking(newBooking);
    navigate(`/farmer/qr/${newBooking.id}`);
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center gap-3">
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} className="p-2 -ml-2 text-gray-500 bg-white rounded-full border border-gray-200 shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}
        <h2 className="text-xl font-bold text-gray-900">
          {step === 1 ? 'Produce Details' : step === 2 ? 'Select Centre & Date' : 'Confirm Booking'}
        </h2>
      </div>

      <div className="flex gap-2 mb-6">
        {[1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Wheat className="w-4 h-4 text-gray-500" /> Select Crop
              </label>
              <div className="grid grid-cols-2 gap-3">
                {farmer.crops.map(c => (
                  <button
                    key={c}
                    onClick={() => setCrop(c)}
                    className={`py-3 rounded-xl border text-sm font-medium transition-colors ${
                      crop === c 
                        ? 'bg-blue-50 border-blue-600 text-blue-700' 
                        : 'bg-white border-gray-300 text-gray-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-500" /> Expected Quantity (KG)
              </label>
              <input 
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border text-lg"
                placeholder="e.g. 20"
              />
              <p className="text-xs text-gray-500 mt-2">Enter the approximate weight of your produce. Capacity is reserved based on this quantity.</p>
            </div>
          </div>
          
          <button
            onClick={() => setStep(2)}
            disabled={!quantity || quantity <= 0}
            className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-sm hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 space-y-5">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" /> Procurement Centre
              </label>
              <select 
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
                value={centreId}
                onChange={(e) => setCentreId(e.target.value)}
              >
                {centres.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.location})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-500" /> Date
              </label>
              <input 
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border-gray-300 rounded-xl shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 border bg-white"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" /> Time Window
              </label>
              <div className="space-y-3">
                {['09:00-10:00', '10:00-11:00', '11:00-12:00', '14:00-15:00'].map(tw => {
                  const cap = getAvailableCapacity(centreId, date, tw);
                  const isSelected = timeWindow === tw;
                  const totalCap = centre?.capacityPerHour || 100;
                  const reserved = totalCap - cap;
                  
                  return (
                    <div 
                      key={tw}
                      onClick={() => setTimeWindow(tw)}
                      className={`p-3 rounded-xl border cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-600 ring-1 ring-blue-600' 
                          : 'bg-white border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className={`font-semibold ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>{tw}</span>
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">Est. Wait: 15m</span>
                      </div>
                      
                      <div className="text-xs text-gray-600 grid grid-cols-2 gap-1 mb-1.5">
                        <div>Total Capacity: <span className="font-medium text-gray-900">{totalCap} KG</span></div>
                        <div>Reserved: <span className="font-medium text-gray-900">{reserved} KG</span></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-gray-600">Available:</span>
                        <span className={cap < requested ? 'text-red-600 font-bold' : 'text-green-600'}>{cap} KG</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden flex">
                        <div className="bg-gray-400 h-1.5" style={{ width: `${(reserved / totalCap) * 100}%` }}></div>
                        {isSelected && cap >= requested && (
                          <div className="bg-blue-500 h-1.5" style={{ width: `${(requested / totalCap) * 100}%` }}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            disabled={!canBook}
            className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-sm transition-colors ${
              canBook ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Review Booking
          </button>
          
          {!canBook && (
            <p className="text-red-600 text-sm text-center font-medium bg-red-50 p-2 rounded-lg">
              Requested {requested} KG exceeds available capacity in selected slot.
            </p>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600" /> Booking Summary
            </h3>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Produce</span>
                <span className="font-bold text-gray-900">{requested} KG {crop}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Centre</span>
                <span className="font-semibold text-gray-900 text-right">{centre?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold text-gray-900">{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Time Window</span>
                <span className="font-semibold text-gray-900">{timeWindow}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Est. Waiting Time</span>
                <span className="font-semibold text-gray-900">~15 mins</span>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <span className="text-gray-600 font-medium">Remaining Slot Capacity</span>
                <span className="font-bold text-green-700">{availableCapacity - requested} KG</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 rounded-xl font-bold text-white bg-blue-600 shadow-md hover:bg-blue-700 transition-colors"
          >
            Confirm & Generate QR
          </button>
        </div>
      )}
    </div>
  );
}
