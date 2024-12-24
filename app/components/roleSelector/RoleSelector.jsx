'use client';
import { useAuth } from '@/app/AuthProvider';

const RoleSelector = () => {
  const { user, updateUserRole } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-8">Choose your role</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Driver Option */}
          <div
            onClick={() => updateUserRole('driver')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Driver</h3>
              <p className="text-gray-600">Offer rides and earn money</p>
            </div>
          </div>
          {/* Passenger Option */}
          <div
            onClick={() => updateUserRole('passenger')}
            className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Passenger</h3>
              <p className="text-gray-600">Find and book rides</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;