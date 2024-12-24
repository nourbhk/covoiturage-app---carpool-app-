'use client';
import React from 'react';
import DriverForm from '../../../components/Driver-form/DriverForm';
import Map from '../../../components/Map/Map'; // Your existing map component
import { BookingProvider } from '../../../components/Booking/BookingContext';
import NavBar from '@/app/components/NavBar/NavBar';
const page = () => {
  return (
    <div>
    <NavBar />
    <div className="grid grid-cols-1 md:grid-cols-3">
        <BookingProvider>
        <div className="bg-white items-center pl-10 pt-6">
          <DriverForm />
        </div>
        <div className="col-span-2 bg-gray-100 h-full order-first md:order-last pt-6 mb-9">
          <Map />
        </div>
        </BookingProvider>
      </div>
    </div>
  );
};

export default page;