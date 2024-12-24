"use client";
import React, { useState, useMemo } from "react";
import { reservations as initialReservations } from "../../Reservations";
import NavBar from "@/app/components/NavBar/NavBar";

const Page = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const sortedReservations = useMemo(() => {
    return [...reservations].sort((a, b) => {
      const dateA = new Date(`${a.departureDate} ${a.departureTime}`);
      const dateB = new Date(`${b.departureDate} ${b.departureTime}`);
      return dateB.getTime() - dateA.getTime();
    });
  }, [reservations]);

  const isReservationValid = (departureDate: string, departureTime: string): boolean => {
    const reservationDateTime = new Date(`${departureDate} ${departureTime}`);
    const currentDateTime = new Date();
    return reservationDateTime > currentDateTime;
  };

  const getStatusColor = (status: typeof reservations[0]["status"]): string => {
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

  const handleCancelReservation = async (reservationId: number) => {
    try {
      // Add your API call to cancel the reservation here
      setReservations(prevReservations =>
        prevReservations.map(reservation =>
          reservation.id === reservationId
            ? { ...reservation, status: "cancelled" as const }
            : reservation
        )
      );
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-1 bg-gray-100 flex flex-col overflow-hidden">
        <h2 className="text-2xl font-bold p-6 pb-4">My Reservations</h2>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="grid gap-4">
            {sortedReservations.map((reservation) => (
              <div 
                key={reservation.id} 
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setExpandedCard(expandedCard === reservation.id ? null : reservation.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {reservation.departure} → {reservation.destination}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {new Date(reservation.departureDate).toLocaleDateString()} at {reservation.departureTime}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${reservation.price}</p>
                      <p className={`text-sm ${getStatusColor(reservation.status)}`}>
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>

                {expandedCard === reservation.id && (
                  <div className="p-4 border-t">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Driver</p>
                        <p className="font-medium">{reservation.driverName}</p>
                        <p className="text-sm">Rating: {reservation.driverRating} ⭐</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Seats Reserved</p>
                        <p className="font-medium">{reservation.seats}</p>
                      </div>
                      {reservation.status === "active" && 
                       isReservationValid(reservation.departureDate, reservation.departureTime) && (
                        <button 
                          className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCancelReservation(reservation.id);
                          }}
                        >
                          Cancel Reservation
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {reservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No reservations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;