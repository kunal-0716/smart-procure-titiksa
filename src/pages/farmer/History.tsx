import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { History, FileText, ChevronRight } from 'lucide-react';

export default function FarmerHistory() {
  const currentUser = useAppStore(state => state.currentUser);
  const allReceipts = useAppStore(state => state.receipts);
  const centres = useAppStore(state => state.centres);

  const receipts = allReceipts.filter(r => r.farmerId === currentUser?.id);

  return (
    <div className="space-y-6 pb-6">
      <h2 className="text-xl font-bold text-gray-900 px-1">Procurement History</h2>

      {receipts.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-sm">
          <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">No History Yet</h3>
          <p className="text-sm text-gray-500 mt-1">Your completed procurements will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {receipts.map(receipt => {
            const centre = centres.find(c => c.id === receipt.centreId);
            return (
              <Link 
                key={receipt.id}
                to={`/farmer/receipt/${receipt.id}`}
                className="block bg-white rounded-2xl shadow-sm border border-gray-200 p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex justify-between items-start mb-3 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-gray-500">{new Date(receipt.date).toLocaleDateString()}</span>
                    <h3 className="font-bold text-gray-900 text-lg mt-0.5">{receipt.actualQuantity} KG {receipt.crop}</h3>
                  </div>
                  <div className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-100">
                    {receipt.paymentStatus}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div className="text-gray-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> 
                    {centre?.name}
                  </div>
                  <div className="flex items-center gap-1 text-gray-900 font-bold">
                    ₹{receipt.totalAmount}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
