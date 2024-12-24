'use client';
import React, { useState, useEffect } from 'react';
import { useBookingContext } from '../Booking/BookingContext';

interface RideFormData {
  driverName: string;
  departureTime: string;
  departureDate: string;
  seats: number;
  price: number;
  driverComments: string;
  departure: string;
  destination: string;
}

const DriverForm = () => {
  const { departure, destination, setDeparture, setDestination } = useBookingContext();
  const [formData, setFormData] = useState<RideFormData>({
    driverName: '',
    departureTime: '',
    departureDate: '',
    seats: 1,
    price: 0,
    driverComments: '',
    departure: departure || '',
    destination: destination || '',
  });

  // Update form when context changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      departure: departure || '',
      destination: destination || '',
    }));
  }, [departure, destination]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'departure') {
      setDeparture(value);
    } else if (name === 'destination') {
      setDestination(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    setFormData({
      driverName: '',
      departureTime: '',
      departureDate: '',
      seats: 1,
      price: 0,
      driverComments: '',
      departure: '',
      destination: '',
    });
    setDeparture('');
    setDestination('');
  };

//   const extractCityName = (location: string) => {
//     if (!location) return '';
//     // Split by comma and remove leading/trailing spaces
//     const parts = location.split(',').map(part => part.trim());
//     // Return the city name (usually the second part, index 1)
//     const len=location.length;
//     return parts[len-1] || ''; // Returns Tunis from "R4QV+PGR, Tunis, Tunisie"
//   };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 border-b-[1px]">
      <h2 className="text-2xl font-bold mb-6">Create a Ride</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Driver Information */}
        <div>
          <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={formData.driverName}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Locations */}
        <div>
          <label htmlFor="departure" className="block text-sm font-medium text-gray-700">
            Departure Location
          </label>
          <input
            type="text"
            id="departure"
            name="departure"
            value={formData.departure}
            onChange={handleLocationChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleLocationChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
              Departure Date
            </label>
            <input
              type="date"
              id="departureDate"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="departureTime" className="block text-sm font-medium text-gray-700">
              Departure Time
            </label>
            <input
              type="time"
              id="departureTime"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Seats and Price */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="seats" className="block text-sm font-medium text-gray-700">
              Available Seats
            </label>
            <input
              type="number"
              id="seats"
              name="seats"
              min="1"
              max="8"
              value={formData.seats}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price per Seat ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Driver Comments */}
        <div>
          <label htmlFor="driverComments" className="block text-sm font-medium text-gray-700">
            Driver Comments
          </label>
          <textarea
            id="driverComments"
            name="driverComments"
            value={formData.driverComments}
            onChange={handleInputChange}
            rows={3}
            placeholder="Add any comments or rules for passengers (e.g., no smoking, luggage restrictions, music preferences, etc.)"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverForm;