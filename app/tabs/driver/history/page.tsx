"use client";
import React, { useState, useRef, useEffect } from "react";
import { DriverRide, dummyRides } from "../../RidesHistory";
import NavBar from "@/app/components/NavBar/NavBar";

const Page = () => {
  const [rides, setRides] = useState<DriverRide[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [rideToCancel, setRideToCancel] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setRides(dummyRides);
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const sendCancellationEmails = (ride: DriverRide) => {
    ride.passengers.forEach(passenger => {
      console.log(`Sending cancellation email to ${passenger.name} (${passenger.email})`);
      console.log(`Ride details: ${ride.departure} to ${ride.destination} on ${formatDate(ride.departureDate)}`);
    });
  };

  const handleCancelRide = () => {
    if (rideToCancel === null) return;
    
    setRides(prevRides => prevRides.map(ride => {
      if (ride.id === rideToCancel) {
        sendCancellationEmails(ride);
        return { ...ride, status: "cancelled" };
      }
      return ride;
    }));

    dialogRef.current?.close();
    setRideToCancel(null);
  };

  const openCancelDialog = (rideId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setRideToCancel(rideId);
    dialogRef.current?.showModal();
  };

  const closeDialog = (e: React.MouseEvent) => {
    e.stopPropagation();
    dialogRef.current?.close();
    setRideToCancel(null);
  };

  const getStatusColor = (status: DriverRide["status"]): string => {
    switch (status) {
      case "active":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "finished":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-1 bg-gray-100 flex flex-col overflow-hidden">
        <h2 className="text-2xl font-bold p-6 pb-4">My Posted Rides</h2>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid gap-4">
            {rides?.map((ride) => (
              <div 
                key={ride.id} 
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === ride.id ? null : ride.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {ride.departure} → {ride.destination}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(ride.departureDate)} at {ride.departureTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${ride.price}</p>
                      <p className={`text-sm ${getStatusColor(ride.status)}`}>
                        {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {expandedCard === ride.id && (
                  <div className="p-4 border-t">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600">Seats</p>
                        <p className="font-medium">
                          {ride.bookedSeats} booked / {ride.availableSeats} total
                        </p>
                      </div>

                      {/* Passenger List */}
                      {ride.passengers.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold mb-2">Passengers:</p>
                          <div className="space-y-2">
                            {ride.passengers.map(passenger => (
                              <div key={passenger.id} className="bg-gray-50 p-3 rounded">
                                <p className="font-medium">{passenger.name}</p>
                                <p className="text-sm text-gray-600">{passenger.email}</p>
                                <p className="text-sm text-gray-600">{passenger.phoneNumber}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {ride.status === "active" && (
                        <button 
                          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                          onClick={(e) => openCancelDialog(ride.id, e)}
                        >
                          Cancel Ride
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {(!rides || rides.length === 0) && (
            <div className="text-center py-8">
              <p className="text-gray-600">No rides found</p>
            </div>
          )}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="rounded-lg shadow-lg p-0 backdrop:bg-black backdrop:bg-opacity-50"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeDialog(e);
          }
        }}
      >
        <div className="min-w-[300px] p-4">
          <h3 className="text-lg font-semibold mb-2">Are you absolutely sure?</h3>
          <p className="text-gray-600 mb-4">
            This will cancel the ride. All passengers will be notified.
          </p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100 transition-colors"
              onClick={closeDialog}
            >
              No, keep ride
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelRide();
              }}
            >
              Yes, cancel ride
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Page;