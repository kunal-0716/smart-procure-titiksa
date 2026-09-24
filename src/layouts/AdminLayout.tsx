import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/store';
import { LayoutDashboard, Building2, LogOut, FileBarChart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAppStore(state => state.logout);

  const nav = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Centres', href: '/admin/centres', icon: Building2 },
    { name: 'Reports', href: '/admin/reports', icon: FileBarChart },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <h1 className="text-lg font-bold">State Admin</h1>
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
                    ? "bg-slate-800 text-white" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 md:hidden">
          <h1 className="text-lg font-bold text-gray-900">Admin</h1>
          <button onClick={handleLogout} className="text-gray-600">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
