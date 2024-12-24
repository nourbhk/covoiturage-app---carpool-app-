// ridesHistory.ts
export interface Passenger {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
  }
  
  export interface DriverRide {
    id: number;
    departure: string;
    destination: string;
    departureTime: string;
    departureDate: string;
    price: number;
    availableSeats: number;
    status: "active" | "finished" | "cancelled";
    bookedSeats: number;
    passengers: Passenger[];
  }
  
  export const dummyRides: DriverRide[] = [
    {
      id: 1,
      departure: "San Francisco",
      destination: "Los Angeles",
      departureTime: "09:00",
      departureDate: "2024-12-25",
      price: 45,
      availableSeats: 4,
      bookedSeats: 2,
      status: "active",
      passengers: [
        { id: 101, name: "John Doe", email: "john@example.com", phoneNumber: "+1 (555) 123-4567" },
        { id: 102, name: "Jane Smith", email: "jane@example.com", phoneNumber: "+1 (555) 234-5678" }
      ]
    },
    {
      id: 2,
      departure: "Seattle",
      destination: "Portland",
      departureTime: "14:30",
      departureDate: "2024-12-24",
      price: 35,
      availableSeats: 3,
      bookedSeats: 3,
      status: "active",
      passengers: [
        { id: 103, name: "Alice Johnson", email: "alice@example.com", phoneNumber: "+1 (555) 345-6789" },
        { id: 104, name: "Bob Wilson", email: "bob@example.com", phoneNumber: "+1 (555) 456-7890" },
        { id: 105, name: "Carol Brown", email: "carol@example.com", phoneNumber: "+1 (555) 567-8901" }
      ]
    },
    {
      id: 3,
      departure: "New York",
      destination: "Boston",
      departureTime: "11:00",
      departureDate: "2024-12-20",
      price: 55,
      availableSeats: 4,
      bookedSeats: 1,
      status: "cancelled",
      passengers: [
        { id: 106, name: "David Lee", email: "david@example.com", phoneNumber: "+1 (555) 678-9012" }
      ]
    },
    {
      id: 4,
      departure: "Chicago",
      destination: "Detroit",
      departureTime: "08:15",
      departureDate: "2024-12-23",
      price: 40,
      availableSeats: 3,
      bookedSeats: 0,
      status: "finished",
      passengers: []
    }
  ];