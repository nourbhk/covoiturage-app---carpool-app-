'use client';
import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/app/AuthProvider'

const NavBar = () => {
  const { user, logout, updateUserRole } = useAuth();

  const handleRoleSwitch = () => {
    if (user) {
      const newRole = user.role === 'driver' ? 'passenger' : 'driver';
      updateUserRole(newRole);
    }
  };

  if (!user) return null;

  return (
    <div className='flex justify-between p-2 px-4 border-b-[1px] shadow-sm bg-white'>
      <div className='flex gap-6 items-center'>
        <Image src='/carpool_logo.png' alt='logo' width={100} height={32} />
        <div className='hidden md:flex gap-4 items-center'>
          <ul className='flex gap-4'>
            <li>
              <Link href={`/tabs/${user.role}/home`} className='hover:text-blue-500 transition-colors'>
                Home
              </Link>
            </li>
            <li>
              <Link href={`/tabs/${user.role}/history`} className='hover:text-blue-500 transition-colors'>
                History
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button
          onClick={handleRoleSwitch}
          className='px-3 py-1.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors text-sm'
        >
          Switch to {user.role === 'driver' ? 'Passenger' : 'Driver'}
        </button>
        <button
          onClick={logout}
          className='px-3 py-1.5 rounded-md bg-gray-400 text-white hover:bg-red-600 transition-colors text-sm'
        >
          Log Out
        </button>
        <div className='flex items-center gap-2'>
          <div className='h-7 w-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm'>
            {user.name[0] || 'U'}
          </div>
          <span className='text-gray-700 text-sm'>
            ({user.role})
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;