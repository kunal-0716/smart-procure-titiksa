import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/store';
import { LayoutDashboard, Users, LogOut, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function OperatorLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAppStore(state => state.logout);

  const nav = [
    { name: 'Dashboard', href: '/operator', icon: LayoutDashboard },
    { name: 'Live Queue', href: '/operator/queue', icon: Users },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Settings className="w-6 h-6 text-blue-600 mr-2" />
          <h1 className="text-lg font-bold text-gray-900">Operator Panel</h1>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
          {nav.map(item => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
          <h1 className="text-lg font-bold text-gray-900">Operator Panel</h1>
          <button onClick={handleLogout} className="text-gray-600">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Nav */}
        <nav className="md:hidden bg-white border-t border-gray-200 flex justify-around p-3">
          {nav.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs",
                  isActive ? "text-blue-600 font-medium" : "text-gray-500"
                )}
              >
                <Icon className="h-6 w-6" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
