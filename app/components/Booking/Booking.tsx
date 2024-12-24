"use client";
import React, { useState, useEffect } from "react";
import Card from "./../Card/Card";
import { rides as initialRides } from "./../Card/ride";
import { useBookingContext } from "./BookingContext";

interface FilterState {
  driverName: string;
  price: string;
  from: string;
  to: string;
  date: string;
  hour: string;
}

const Booking = () => {
  const { departure, destination } = useBookingContext();
  const [rides, setRides] = useState(initialRides);
  const [filter, setFilter] = useState<FilterState>({
    driverName: "",
    price: "",
    from: "",
    to: "",
    date: "",
    hour: "",
  });
  const [name, setName] = useState("Book");

  const handleBooking1 = () => {
    setName(`Booking from ${departure} to ${destination}`);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleBooking = (rideId: number, seatsToReserve: number) => {
    setRides((prevRides) =>
      prevRides.map((ride) =>
        ride.id === rideId
          ? { ...ride, seats: ride.seats - seatsToReserve }
          : ride
      )
    );
  };

  const filteredRides = rides.filter(
    (ride) =>
      (!filter.driverName ||
        ride.driverName
          .toLowerCase()
          .includes(filter.driverName.toLowerCase())) &&
      (!filter.price || ride.price <= parseFloat(filter.price)) &&
      (!filter.from ||
        ride.departure.toLowerCase().includes(filter.from.toLowerCase())) &&
      (!filter.to ||
        ride.destination.toLowerCase().includes(filter.to.toLowerCase())) &&
      (!filter.date || ride.departureDate === filter.date) &&
      (!filter.hour || ride.departureTime === filter.hour)
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white p-6">
        <h2 className="text-2xl font-bold mb-4">Find a Ride</h2>
        
        {/* First row of filters */}
        <div className="grid grid-cols-2 gap-4 mb-2">
          <div>
            <label htmlFor="driverName" className="text-sm font-medium">
              Driver Name :
            </label>
            <input
              id="driverName"
              name="driverName"
              type="text"
              value={filter.driverName}
              onChange={handleFilterChange}
              placeholder="Search by driver name"
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="price" className="text-sm font-medium">
              Price :
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={filter.price}
              onChange={handleFilterChange}
              placeholder="Max price"
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Second row of filters */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium">
              Date:
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={filter.date}
              onChange={handleFilterChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>

          <div>
            <label htmlFor="hour" className="block text-sm font-medium">
              Hour:
            </label>
            <input
              id="hour"
              name="hour"
              type="time"
              value={filter.hour}
              onChange={handleFilterChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>
      </div>

      {/* Scrollable cards section */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="grid grid-cols-1 gap-4">
            {filteredRides
              .filter(
                (ride) =>
                  (!destination ||
                    destination
                      .toLowerCase()
                      .includes(ride.destination.toLowerCase())) &&
                  (!departure ||
                    departure
                      .toLowerCase()
                      .includes(ride.departure.toLowerCase()))
              )
              .map((ride) => (
                <Card key={ride.id} ride={ride} onBook={handleBooking} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;