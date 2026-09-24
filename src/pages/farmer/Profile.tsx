import { useState } from 'react';
import { useAppStore } from '../../store/store';
import { User, Phone, MapPin, CheckCircle2, ShieldAlert, FileText, Tractor, Leaf } from 'lucide-react';

export default function FarmerProfile() {
  const currentUser = useAppStore(state => state.currentUser);
  const farmers = useAppStore(state => state.farmers);
  const updateFarmerDetails = useAppStore(state => state.updateFarmerDetails);

  const farmer = farmers.find(f => f.id === currentUser?.id);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    mobile: farmer?.mobile || '',
    landArea: farmer?.landArea || '',
  });

  if (!farmer) return <div className="p-4 text-gray-500">Loading...</div>;

  const handleUpdate = () => {
    updateFarmerDetails(farmer.id, formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-6">
      <h2 className="text-xl font-bold text-gray-900 px-1">Farmer Profile</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 px-6 py-8 text-center text-white relative">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 border-4 border-blue-500 shadow-sm">
            <User className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold">{farmer.name}</h3>
          
          <div className="mt-3 flex justify-center">
            {farmer.status === 'VERIFIED' ? (
              <span className="flex items-center gap-1.5 bg-green-500/20 text-green-50 border border-green-500/50 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4" /> 
                Verified • {farmer.lastVerifiedDate ? new Date(farmer.lastVerifiedDate).toLocaleDateString() : ''}
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-orange-500/20 text-orange-50 border border-orange-500/50 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                <ShieldAlert className="w-4 h-4" /> 
                {farmer.status}
              </span>
            )}
          </div>
        </div>

        {/* Details Content */}
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Aadhaar / ID</p>
                <p className="text-sm font-medium text-gray-900 mt-1 font-mono">{farmer.maskedAadhaar}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Mobile Number</p>
                {isEditing ? (
                  <input 
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full mt-1 p-2 border rounded border-gray-300 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 mt-1">{farmer.mobile}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</p>
                <p className="text-sm font-medium text-gray-900 mt-1">{farmer.village}, {farmer.district}</p>
                <p className="text-xs text-gray-500 mt-0.5">{farmer.state}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                <Tractor className="w-5 h-5" />
              </div>
              <div className="flex-1 border-b border-gray-100 pb-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Land Details</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={formData.landArea}
                    onChange={(e) => setFormData({...formData, landArea: e.target.value})}
                    className="w-full mt-1 p-2 border rounded border-gray-300 text-sm"
                  />
                ) : (
                  <p className="text-sm font-medium text-gray-900 mt-1">{farmer.landArea}</p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Registered Crops</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {farmer.crops.map(crop => (
                    <span key={crop} className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-md border border-blue-100">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <div className="bg-orange-50 text-orange-800 p-3 rounded-lg text-xs flex gap-2 border border-orange-200">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <p>Updating your details will change your status to <strong>PENDING</strong>. You will need to be re-verified by an officer before you can book new procurement slots.</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-xl text-sm"
            >
              Cancel
            </button>
            <button 
              onClick={handleUpdate}
              className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm shadow-sm"
            >
              Save Details
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsEditing(true)}
          className="w-full bg-white border border-gray-300 text-gray-700 font-semibold py-3.5 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
        >
          Update Information
        </button>
      )}
    </div>
  );
}
