// reservations.ts
interface Reservation {
    id: number;
    departure: string;
    destination: string;
    driverName: string;
    driverRating: number;
    price: number;
    departureTime: string;
    departureDate: string;
    seats: number;
    status: "active" | "finished" | "cancelled";
  }
  
  export const reservations: Reservation[] = [
    {
      id: 1,
      departure: "Tunis",
      destination: "Sfax",
      driverName: "Ahmed Ben Ali",
      driverRating: 4.5,
      price: 25,
      departureTime: "09:30",
      departureDate: "2024-12-25",
      seats: 2,
      status: "active",
    },
    {
      id: 2,
      departure: "Sfax",
      destination: "Sousse",
      driverName: "Sarah Mansour",
      driverRating: 4.8,
      price: 20,
      departureTime: "14:00",
      departureDate: "2024-12-23",
      seats: 1,
      status: "active",
    },
    {
      id: 3,
      departure: "Monastir",
      destination: "Tunis",
      driverName: "Karim Gharbi",
      driverRating: 4.2,
      price: 30,
      departureTime: "16:45",
      departureDate: "2024-11-15",
      seats: 3,
      status: "finished",
    },
    {
      id: 4,
      departure: "Sousse",
      destination: "Monastir",
      driverName: "Leila Ben Salah",
      driverRating: 4.7,
      price: 15,
      departureTime: "10:15",
      departureDate: "2024-12-28",
      seats: 2,
      status: "active",
    },
    {
      id: 5,
      departure: "Tunis",
      destination: "Bizerte",
      driverName: "Mohamed Triki",
      driverRating: 4.4,
      price: 18,
      departureTime: "11:30",
      departureDate: "2024-11-20",
      seats: 1,
      status: "cancelled",
    },
    {
      id: 6,
      departure: "Bizerte",
      destination: "Sfax",
      driverName: "Amine Bouazizi",
      driverRating: 4.9,
      price: 35,
      departureTime: "08:00",
      departureDate: "2024-12-30",
      seats: 4,
      status: "active",
    },
    {
      id: 7,
      departure: "Sfax",
      destination: "Gabès",
      driverName: "Nour El Houda",
      driverRating: 4.6,
      price: 22,
      departureTime: "13:20",
      departureDate: "2024-11-25",
      seats: 2,
      status: "finished",
    },
    {
      id: 8,
      departure: "Gabès",
      destination: "Tunis",
      driverName: "Slim Abidi",
      driverRating: 4.3,
      price: 40,
      departureTime: "07:45",
      departureDate: "2024-12-26",
      seats: 3,
      status: "active",
    },
    {
      id: 9,
      departure: "Monastir",
      destination: "Bizerte",
      driverName: "Yasmine Belhadj",
      driverRating: 4.7,
      price: 28,
      departureTime: "15:30",
      departureDate: "2024-11-18",
      seats: 2,
      status: "cancelled",
    },
    {
      id: 10,
      departure: "Sousse",
      destination: "Gabès",
      driverName: "Hichem Mejri",
      driverRating: 4.5,
      price: 32,
      departureTime: "12:00",
      departureDate: "2024-12-29",
      seats: 1,
      status: "active",
    },
  ];