'use client';
import React, { useState } from 'react';

// First, let's define the interfaces
interface Rule {
    type: string;
    icon?: string;
    description: string;
  }
  
  interface Ride {
    id: number;
    departure: string;
    destination: string;
    driverName: string;
    driverRating: number;
    seats: number;
    price: number;
    departureDate: string;
    departureTime: string; // Added departure time
    rules: Rule[];
  }
  
  interface RideProps {
    ride: Ride;
    onBook: (id: number, seats: number) => void;
  }
  
  const Card: React.FC<RideProps> = ({ ride, onBook }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [seatsToReserve, setSeatsToReserve] = useState(0);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState('');
  
    // Format time to display in 12-hour format
    // const formatTime = (time: string) => {
    //   const [hours, minutes] = time.split(':');
    //   const hour = parseInt(hours);
    //   const ampm = hour >= 12 ? 'PM' : 'AM';
    //   const formattedHour = hour % 12 || 12;
    //   return `${formattedHour}:${minutes}`;
    // };
  
    const handleCardClick = () => {
      setIsModalOpen(true);
      setError('');
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSeatsToReserve(parseInt(e.target.value));
    };
  
    const handleConfirmBooking = () => {
      if (seatsToReserve > 0 && seatsToReserve <= ride.seats) {
        onBook(ride.id, seatsToReserve);
        alert(`You have reserved ${seatsToReserve} seat(s) for this ride.`);
        setIsModalOpen(false);
        setSeatsToReserve(0);
        setIsBooking(false);
      } else {
        setError('Please enter a valid number of seats (up to available seats).');
      }
    };
  
    const renderRatingStars = (rating: number) => {
      return (
        <div className="flex items-center ">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              className={`w-4 h-4 ${
                index < rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-600">({rating.toFixed(1)})</span>
        </div>
      );
    };
  
    return (
      <div>
        {/* Ride Card */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 mb-6 cursor-pointer hover:shadow-xl transition-shadow duration-300 border border-gray-200"
          onClick={handleCardClick}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {ride.departure} ➡️ {ride.destination}
            </h3>
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium text-blue-600">
                            {ride.departureDate} {(ride.departureTime)}
                        </span>
                    </div>
            <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
              <svg 
                className="w-4 h-4 text-blue-600 mr-1" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-blue-600">
                {(ride.departureTime)}
              </span>
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Driver: {ride.driverName}</p>
            <div className="text-sm text-gray-600">
              Driver Rating: {renderRatingStars(ride.driverRating)}
            </div>
            <p className="text-sm text-gray-600">Seats Available: {ride.seats}</p>
            <p className="text-sm font-semibold text-blue-600">Price: ${ride.price}</p>
            
            {ride.rules && ride.rules.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {ride.rules.slice(0, 2).map((rule, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {rule.description}
                  </span>
                ))}
                {ride.rules.length > 2 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    +{ride.rules.length - 2} more
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ride Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700">Route & Time</p>
                  <p className="text-gray-600">{ride.departure} ➡️ {ride.destination}</p>
                  <p className="text-gray-600 mt-1">
                    Departure Time: {(ride.departureTime)}
                  </p>
                </div>
  
                <div>
                  <p className="font-medium text-gray-700">Driver Information</p>
                  <p className="text-gray-600">{ride.driverName}</p>
                  <div className="mt-1">{renderRatingStars(ride.driverRating)}</div>
                </div>
  
                <div>
                  <p className="font-medium text-gray-700">Ride Details</p>
                  <p className="text-gray-600">Seats Available: {ride.seats}</p>
                  <p className="text-gray-600 font-semibold">Price: ${ride.price}</p>
                </div>
  
                {ride.rules && ride.rules.length > 0 && (
                  <div>
                    <p className="font-medium text-gray-700 mb-2">Ride Rules</p>
                    <div className="space-y-2">
                      {ride.rules.map((rule, index) => (
                        <div 
                          key={index}
                          className="flex items-center bg-gray-50 p-3 rounded-lg"
                        >
                          <span className="text-sm text-gray-700">
                            {rule.description}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
  
                {/* Booking Form */}
                {!isBooking ? (
                  <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    onClick={() => setIsBooking(true)}
                  >
                    Book Ride
                  </button>
                ) : (
                  <div className="mt-6">
                    <label
                      htmlFor="seats"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Enter seats to reserve:
                    </label>
                    <input
                      type="number"
                      id="seats"
                      value={seatsToReserve}
                      onChange={handleSeatsChange}
                      min="1"
                      max={ride.seats}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Number of seats"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={handleConfirmBooking}
                        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 w-full"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setIsBooking(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 w-full"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
  
              <button
                onClick={closeModal}
                className="mt-6 text-gray-500 hover:text-gray-700 text-sm"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Card;