'use client';
import React, { createContext, useContext, useState } from 'react';

type UserRole = 'passenger' | 'driver' | null;

interface BookingContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  destination: string;
  setDestination: (destination: string) => void;
  departure: string;
  setDeparture: (departure: string) => void;
}

const defaultContextValue: BookingContextType = {
  userRole: null,
  setUserRole: () => {},
  destination: '',
  setDestination: () => {},
  departure: '',
  setDeparture: () => {},
};

const BookingContext = createContext<BookingContextType>(defaultContextValue);

export const BookingProvider = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [destination, setDestination] = useState<string>('');
  const [departure, setDeparture] = useState<string>(''); 


  return (
    <BookingContext.Provider value={{ userRole, setUserRole, destination, setDestination, departure, setDeparture }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  return useContext(BookingContext);
};