import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/store';
import { ArrowLeft, Bell, CheckCircle2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function FarmerNotifications() {
  const currentUser = useAppStore(state => state.currentUser);
  const allNotifications = useAppStore(state => state.notifications);
  const markRead = useAppStore(state => state.markNotificationRead);

  const notifications = allNotifications.filter(n => n.farmerId === currentUser?.id);

  // Sort: unread first, then by date desc (mocking date desc by simply reversing for now)
  const sortedNotifications = [...notifications].reverse().sort((a, b) => {
    if (a.read === b.read) return 0;
    return a.read ? 1 : -1;
  });

  return (
    <div className="space-y-6 pb-6 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/farmer" className="p-2 -ml-2 text-gray-500 hover:text-gray-900 bg-white rounded-full border border-gray-200 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
        </div>
      </div>

      {sortedNotifications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-sm">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900">No Notifications</h3>
          <p className="text-sm text-gray-500 mt-1">You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedNotifications.map(notification => (
            <div 
              key={notification.id}
              onClick={() => {
                if (!notification.read) markRead(notification.id);
              }}
              className={cn(
                "p-4 rounded-2xl border transition-colors cursor-pointer",
                !notification.read 
                  ? "bg-blue-50/50 border-blue-200 shadow-sm" 
                  : "bg-white border-gray-100 opacity-75"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  !notification.read ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"
                )}>
                  {!notification.read ? <Bell className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={cn("text-sm font-bold", !notification.read ? "text-gray-900" : "text-gray-700")}>
                      {notification.title}
                    </h4>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">
                      {new Date(notification.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={cn("text-sm", !notification.read ? "text-gray-700" : "text-gray-500")}>
                    {notification.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
