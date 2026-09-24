import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { ArrowLeft, CheckCircle2, FileText, Scale } from 'lucide-react';

export default function OperatorProcurement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookings, farmers, updateBookingStatus } = useAppStore();
  
  const booking = bookings.find(b => b.id === id);
  const farmer = farmers.find(f => f.id === booking?.farmerId);

  const [actualWeight, setActualWeight] = useState<number | ''>('');
  const [qualityGrade, setQualityGrade] = useState('A');
  const [step, setStep] = useState<'DETAILS' | 'WEIGHT_QUALITY' | 'RECEIPT'>('DETAILS');

  if (!booking || !farmer) {
    return <div>Booking not found</div>;
  }

  const basePricePerKg = 25;
  const qualityMultiplier = qualityGrade === 'A' ? 1.0 : qualityGrade === 'B' ? 0.95 : 0.9;
  const calculatedWeight = typeof actualWeight === 'number' ? actualWeight : 0;
  const totalAmount = calculatedWeight * basePricePerKg * qualityMultiplier;

  const handleComplete = () => {
    updateBookingStatus(booking.id, 'COMPLETED');
    setStep('RECEIPT');
  };

  if (step === 'RECEIPT') {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Procurement Complete</h2>
          <p className="text-gray-500 mb-8">Receipt generated successfully for {farmer.name}.</p>
          
          <div className="bg-gray-50 p-6 rounded-lg text-left space-y-3 font-mono text-sm mb-8 border border-gray-200">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Receipt No:</span>
              <span className="font-bold">RCPT-{booking.id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Farmer:</span>
              <span>{farmer.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Expected Qty:</span>
              <span>{booking.expectedQuantity} KG</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Actual Qty:</span>
              <span className="font-bold">{actualWeight} KG</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-500">Quality Grade:</span>
              <span>{qualityGrade}</span>
            </div>
            <div className="flex justify-between pt-2 text-lg">
              <span className="font-bold text-gray-900">Total Amount:</span>
              <span className="font-bold text-green-600">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" /> Print
            </button>
            <Link to="/operator/queue" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700">
              Back to Queue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/operator/queue" className="p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Procurement Process</h2>
          <p className="text-sm text-gray-500">Booking {booking.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Farmer Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Name</p>
                <p className="font-medium text-gray-900">{farmer.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Village</p>
                <p className="font-medium text-gray-900">{farmer.village}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Expected Quantity</p>
                <p className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block mt-0.5">
                  {booking.expectedQuantity} KG
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-600" /> Record Actuals
              </h3>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Weight (KG)
                </label>
                <input 
                  type="number"
                  min="0"
                  step="0.1"
                  value={actualWeight}
                  onChange={(e) => setActualWeight(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 border text-lg"
                  placeholder="0.0"
                />
                
                {typeof actualWeight === 'number' && actualWeight > booking.expectedQuantity * 1.1 && (
                  <p className="mt-2 text-sm text-orange-600 flex items-center gap-1 bg-orange-50 p-2 rounded">
                    Weight exceeds 10% tolerance. Requires manual approval.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quality Assessment (Grade)
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['A', 'B', 'C'].map(grade => (
                    <button
                      key={grade}
                      onClick={() => setQualityGrade(grade)}
                      className={`py-2 rounded-lg border font-medium text-sm transition-colors ${
                        qualityGrade === grade 
                          ? 'bg-blue-50 border-blue-600 text-blue-700 shadow-sm' 
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Grade {grade}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center mb-4 text-sm">
                <span className="text-gray-500">Base Price (₹25/kg) × {actualWeight || 0}kg × Grade {qualityGrade} modifier</span>
                <span className="text-xl font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
              </div>
              <button 
                onClick={handleComplete}
                disabled={actualWeight === '' || actualWeight <= 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Verify & Generate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
