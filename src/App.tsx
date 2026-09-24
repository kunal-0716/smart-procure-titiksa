import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import FarmerLayout from './layouts/FarmerLayout';
import FarmerDashboard from './pages/farmer/Dashboard';
import FarmerProfile from './pages/farmer/Profile';
import FarmerBook from './pages/farmer/Book';
import FarmerQR from './pages/farmer/QR';
import FarmerQueue from './pages/farmer/Queue';
import FarmerHistory from './pages/farmer/History';
import FarmerReceipt from './pages/farmer/Receipt';
import FarmerNotifications from './pages/farmer/Notifications';
import OfficerLayout from './layouts/OfficerLayout';
import OfficerDashboard from './pages/officer/Dashboard';
import OperatorLayout from './layouts/OperatorLayout';
import OperatorDashboard from './pages/operator/Dashboard';
import OperatorQueue from './pages/operator/Queue';
import OperatorProcurement from './pages/operator/Procurement';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCentres from './pages/admin/Centres';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Farmer Routes */}
        <Route path="/farmer" element={<FarmerLayout />}>
          <Route index element={<FarmerDashboard />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="book" element={<FarmerBook />} />
          <Route path="qr/:id" element={<FarmerQR />} />
          <Route path="queue" element={<FarmerQueue />} />
          <Route path="history" element={<FarmerHistory />} />
          <Route path="receipt/:id" element={<FarmerReceipt />} />
          <Route path="notifications" element={<FarmerNotifications />} />
        </Route>

        {/* Officer Routes */}
        <Route path="/officer" element={<OfficerLayout />}>
          <Route index element={<OfficerDashboard />} />
        </Route>

        {/* Operator Routes */}
        <Route path="/operator" element={<OperatorLayout />}>
          <Route index element={<OperatorDashboard />} />
          <Route path="queue" element={<OperatorQueue />} />
          <Route path="procurement/:id" element={<OperatorProcurement />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="centres" element={<AdminCentres />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
