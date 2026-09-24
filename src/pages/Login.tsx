import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/store';
import { Tractor, ShieldCheck, Settings, LineChart } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const login = useAppStore(state => state.login);

  const handleLogin = (role: 'FARMER' | 'OFFICER' | 'OPERATOR' | 'ADMIN', id?: string) => {
    login(role, id);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Smart Procure
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select a role to enter the demo
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => handleLogin('FARMER', 'f1')} // logging in as verified farmer f1
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              <Tractor className="h-5 w-5" />
              Farmer Demo
            </button>
            <button
              onClick={() => handleLogin('OFFICER')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <ShieldCheck className="h-5 w-5 text-gray-500" />
              Officer Demo
            </button>
            <button
              onClick={() => handleLogin('OPERATOR')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              Operator Demo
            </button>
            <button
              onClick={() => handleLogin('ADMIN')}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <LineChart className="h-5 w-5 text-gray-500" />
              Admin Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
