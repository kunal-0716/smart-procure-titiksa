import { Outlet } from 'react-router-dom';

export default function OfficerLayout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm">
        <h1 className="text-lg font-bold text-gray-900">Officer Portal</h1>
      </header>
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
