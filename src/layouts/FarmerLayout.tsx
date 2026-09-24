import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, User, Calendar, History, ListOrdered, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function FarmerLayout() {
  const location = useLocation();
  const { i18n } = useTranslation();

  const nav = [
    { name: 'Home', href: '/farmer', icon: Home },
    { name: 'Book', href: '/farmer/book', icon: Calendar },
    { name: 'Queue', href: '/farmer/queue', icon: ListOrdered },
    { name: 'History', href: '/farmer/history', icon: History },
    { name: 'Profile', href: '/farmer/profile', icon: User },
  ];

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white p-4 shadow-sm relative z-10">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-wide">Smart Procure</h1>
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm bg-blue-700/50 hover:bg-blue-700 px-2 py-1 rounded">
              <Globe className="w-4 h-4" />
              {i18n.language === 'en' ? 'EN' : 'HI'}
            </button>
            <Link to="/farmer/notifications" className="relative p-1">
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-blue-600"></span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            </Link>
            <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border border-blue-500 shadow-inner">
              <User className="h-5 w-5 text-blue-100" />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-md w-full mx-auto p-4 pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-around p-3">
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
        </div>
      </nav>
    </div>
  );
}
