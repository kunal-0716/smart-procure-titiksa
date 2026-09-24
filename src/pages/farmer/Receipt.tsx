import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { ArrowLeft, Download, CheckCircle2, Building2 } from 'lucide-react';

export default function FarmerReceipt() {
  const { id } = useParams();
  const receipts = useAppStore(state => state.receipts);
  const farmers = useAppStore(state => state.farmers);
  const centres = useAppStore(state => state.centres);
  
  const receipt = receipts.find(r => r.id === id);
  const farmer = farmers.find(f => f.id === receipt?.farmerId);
  const centre = centres.find(c => c.id === receipt?.centreId);

  if (!receipt || !farmer || !centre) return <div className="p-4">Receipt not found</div>;

  return (
    <div className="space-y-6 pb-6 animate-in fade-in zoom-in-95">
      <div className="flex items-center justify-between">
        <Link to="/farmer/history" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <button className="flex items-center gap-2 text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-colors">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>

      <div className="bg-white rounded-t-3xl rounded-b-md shadow-sm border border-gray-200 overflow-hidden relative">
        <div className="bg-slate-900 px-6 py-8 text-white text-center">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-6 h-6 text-green-400" />
          </div>
          <h2 className="text-xl font-bold tracking-wide">OFFICIAL RECEIPT</h2>
          <p className="text-slate-400 text-sm mt-1">Smart Procure System</p>
        </div>

        {/* Zigzag bottom border simulation for receipt */}
        <div className="h-3 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBvbHlnb24gcG9pbnRzPSIwLDAgNSwxMCAxMCwwIiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+')] bg-repeat-x -mt-0.5"></div>

        <div className="p-6 space-y-6 bg-[#fafafa]">
          <div className="text-center pb-6 border-b border-dashed border-gray-300">
            <p className="text-sm text-gray-500 uppercase font-semibold tracking-wider">Total Amount</p>
            <h1 className="text-4xl font-black text-gray-900 mt-2">₹{receipt.totalAmount.toFixed(2)}</h1>
            <p className="text-sm font-medium text-green-600 mt-2 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Payment {receipt.paymentStatus}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Receipt No.</span>
              <span className="font-mono font-bold text-gray-900">RCPT-{receipt.id.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-medium text-gray-900">{new Date(receipt.date).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Farmer ID</span>
              <span className="font-medium text-gray-900">{farmer.maskedAadhaar}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-6 space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Procurement Point</span>
              <span className="font-medium text-gray-900 flex items-center gap-1 text-right">
                <Building2 className="w-3.5 h-3.5 text-gray-400" /> {centre.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Produce Type</span>
              <span className="font-medium text-gray-900">{receipt.crop}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Quality Grade</span>
              <span className="font-bold text-gray-900">Grade {receipt.quality}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-300 pt-6 space-y-3 text-sm bg-gray-100/50 p-4 rounded-xl">
            <div className="flex justify-between">
              <span className="text-gray-600">Expected Quantity</span>
              <span className="font-medium text-gray-900">{receipt.expectedQuantity} KG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Actual Quantity</span>
              <span className="font-bold text-gray-900">{receipt.actualQuantity} KG</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price/KG</span>
              <span className="font-medium text-gray-900">₹{receipt.pricePerKg.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
